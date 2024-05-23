import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MaingLayout from "./layout";
import Home from "./pages/home";
import Artist from "./pages/artist";
import Albumns from "./pages/albums";
import Favourite from "./pages/favourite";
import Detail from "./pages/artist/components/detail";
import Search from "./pages/search";
import ArtistDetail from "./pages/artist/components/detail";
import AlbumDetail from "./pages/albums/components/detail";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MaingLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/artist",
          element: <Artist />,
        },
        {
          path: "/artist/:id",
          element: <Detail />,
        },
        {
          path: "/albumns",
          element: <Albumns />,
        },
        {
          path: "favourite",
          element: <Favourite />,
        },
        {
          path: "search/:search",
          element: <Search />,
        },
        {
          path: "artist/:id",
          element: <ArtistDetail />,
        },
        {
          path : 'albumns/:id',
          element : <AlbumDetail/>
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
