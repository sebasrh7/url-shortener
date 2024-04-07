import guestUrl from "../models/guestUrl.js";

// Crear una URL corta
export const guestCreateShortUrl = async (req, res) => {
  try {
    const user = req.sessionID; // Obtiene la ID de la sesión del usuario

    // solo se puede crear 5 urls por usuario
    const urls = await guestUrl.find({ user });
    if (urls.length >= 6) {
      return res
        .status(400)
        .json({ error: "You have reached the limit of 5 URLs" });
    }

    const { originalUrl } = req.body;
    const clientUrl = process.env.BASE_URL; // Obtiene la URL base del cliente

    // Verifica si la URL ya existe en la base de datos
    const url = await guestUrl.findOne({ originalUrl, user });
    if (url) {
      const shortUrl = `${clientUrl}/guest/${url.shortUrlId}`;
      return res.json({
        _id: url._id,
        originalUrl,
        shortUrlId: url.shortUrlId,
        shortUrl,
        date: url.date,
        user: url.user,
        message: "URL already exists",
      });
    }

    // Crea una URL corta si no existe en la base de datos
    const shortUrlId = Math.random().toString(36).substring(2, 7);

    const newUrl = new guestUrl({
      originalUrl,
      shortUrlId,
      user: user,
      date: new Date(),
    });
    await newUrl.save();

    const shortUrl = `${clientUrl}/guest/${shortUrlId}`;

    res.json({
      _id: newUrl._id,
      originalUrl,
      shortUrlId,
      shortUrl,
      date: newUrl.date,
      message: "URL created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Obtener todas las URLs
export const guestGetUrls = async (req, res) => {
  try {
    const urls = await guestUrl.find({ user: req.sessionID });
    res.json(
      urls.map((url) => ({
        _id: url._id,
        originalUrl: url.originalUrl,
        shortUrlId: url.shortUrlId,
        shortUrl: `${process.env.BASE_URL}/guest/${url.shortUrlId}`,
        date: url.date,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// eliminar urls seleccionadas

export const guestDeleteSelected = async (req, res) => {
  try {
    const { urls } = req.body;
    await guestUrl.deleteMany({ _id: { $in: urls } });
    res.json({ message: "Selected URLs deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Obtener una URL
export const guestGetUrl = async (req, res) => {
  try {
    const UrlId = req.params.id;
    const url = await guestUrl.findById(UrlId);
    if (url) {
      return res.json(url);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Eliminar una URL
export const guestDeleteUrl = async (req, res) => {
  try {
    const UrlId = req.params.id;
    const url = await guestUrl.findByIdAndDelete(UrlId);
    if (url) {
      return res.json({ message: `${url.originalUrl} deleted` });
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Redirigir a la URL original
export const guestRedirectOriginalUrl = async (req, res) => {
  try {
    const shortUrlId = req.params.shortUrlId; // Obtiene el parámetro de la URL
    const url = await guestUrl.findOne({ shortUrlId }); // Busca la URL en la base de datos
    if (url) {
      // Redirige a la URL original
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
