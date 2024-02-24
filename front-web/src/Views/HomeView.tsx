import DefaultViewTemplate, {
  MainLayout,
} from "../Component/DefaultViewTemplate";
import { SectionId } from "../Interface/SectionId";
import HomeIntro from "../Component/HomeIntro";
import AboutView from "../Component/About";
import PricingView from "../Component/Pricing";
import LoginView from "./LoginView";

const HomeView = () => {
  return (
    <MainLayout>
      <DefaultViewTemplate sectionId={SectionId.Home}>
        <HomeIntro />
      </DefaultViewTemplate>
      <DefaultViewTemplate sectionId={SectionId.About}>
        <AboutView />
      </DefaultViewTemplate>
      <DefaultViewTemplate sectionId={SectionId.Projects}>
        <PricingView />
      </DefaultViewTemplate>
    </MainLayout>
  );
};

export default HomeView;
