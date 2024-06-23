import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Favourites } from "../presentation/Favourites/Favourites";
import { Home } from "../presentation/Home/Home";
import { Layout } from "../presentation/Layout/Layout";
import { CardPreview } from "../components/CardPreview/CardPreview";
import { Library } from "../presentation/Library/Library";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:id" element={<CardPreview />} />
            <Route path="/library" element={<Library />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
