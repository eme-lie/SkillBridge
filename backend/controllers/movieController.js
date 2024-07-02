import asyncHandler from "../middleware/asyncHandler.js";

import Movie from "../models/movieModel.js";

export const getMovies = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Sci-fi",
      "Adventure",
      "Music",
      "Thriller",
      "Family",
    ];

    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      name: { $regex: search, $options: "i" },
      genre: { $in: [...genre] },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      movies,
      genres: genreOptions,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: true, message: "Server Error" });
  }
});
