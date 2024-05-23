import { IconAlbum, IconHeart, IconHome, IconUser } from "@tabler/icons-react";

export const slideNav = [
  {
    id: 1,
    name: "Home",
    icon: <IconHome size={20}  />,
    path : '/',
  },
  {
    id: 2,
    name: "Artist",
    icon: <IconUser size={20}  />,
    path : '/artist'
  },
  {
    id: 3,
    name: "Albumns",
    icon: <IconAlbum  size={20} />,
    path : '/albumns'
  },
  {
    id: 4,
    name: "Favourite",
    icon: <IconHeart  size={20} />,
    path : '/favourite'
  },
];





