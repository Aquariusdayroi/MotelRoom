import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = ({ children, enableScroll = true }) => {
    return (
        <>
            <Header enableScroll={enableScroll} />
            {children}
            <Footer />
        </>
    );
};
export default Layout;
