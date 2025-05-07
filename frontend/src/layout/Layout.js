import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = ({ children, enableScroll = true, enableSearch = true }) => {
    return (
        <>
            <Header enableScroll={enableScroll} enableSearch={enableSearch} />
            {children}
            <Footer />
        </>
    );
};
export default Layout;
