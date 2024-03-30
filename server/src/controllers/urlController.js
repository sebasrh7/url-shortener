import Url from "../models/Url.js";

// Crear una URL corta
export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const clientUrl = process.env.BASE_URL; // Obtiene la URL base del cliente
    // Verifica si la URL ya existe en la base de datos

    const url = await Url.findOne({ originalUrl });
    if (url) {
      const shortUrl = `${clientUrl}/${url.shortUrlId}`;
      return res.json({
        _id: url._id,
        originalUrl,
        shortUrl,
        clicks: url.clicks,
        date: url.date,
        message: "URL already exists",
      });
    }

    // Crea una URL corta si no existe en la base de datos
    const shortUrlId = Math.random().toString(36).substring(2, 7);

    const newUrl = new Url({ originalUrl, shortUrlId, date: new Date() });
    await newUrl.save();

    const shortUrl = `${clientUrl}/${shortUrlId}`;

    res.json({
      _id: newUrl._id,
      originalUrl,
      shortUrl,
      clicks: newUrl.clicks,
      date: newUrl.date,
      message: "URL created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Obtener todas las URLs
export const getUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(
      urls.map((url) => ({
        _id: url._id,
        originalUrl: url.originalUrl,
        shortUrlId: `${process.env.BASE_URL}/${url.shortUrlId}`,
        clicks: url.clicks,
        date: url.date,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Obtener una URL
export const getUrl = async (req, res) => {
  try {
    const UrlId = req.params.id;
    const url = await Url.findById(UrlId);
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

// Actualizar una URL
export const updateUrl = async (req, res) => {
  try {
    const UrlId = req.params.id;
    const { originalUrl } = req.body;
    const url = await Url.findByIdAndUpdate(
      UrlId,
      { originalUrl },
      { new: true }
    );
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
export const deleteUrl = async (req, res) => {
  try {
    const UrlId = req.params.id;
    const url = await Url.findByIdAndDelete(UrlId);
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
export const redirectOriginalUrl = async (req, res) => {
  try {
    const shortUrlId = req.params.shortUrlId; // Obtiene el parámetro de la URL
    const url = await Url.findOne({ shortUrlId }); // Busca la URL en la base de datos
    if (url) {
      // Incrementa el contador de clicks
      await Url.findByIdAndUpdate(url._id, { clicks: url.clicks + 1 });
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
