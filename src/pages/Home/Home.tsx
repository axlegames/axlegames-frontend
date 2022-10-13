import Footer from "./views/Footer";
import GamesView from "./views/GamesView";
import MainLayout from "../../layouts/MainLayout";
import HowToPlayView from "./views/HowToPlayView";

const Home = () => {
  return (
    <MainLayout>
      <GamesView />
      <HowToPlayView />
      <Footer />
    </MainLayout>
  );
};

export default Home;
