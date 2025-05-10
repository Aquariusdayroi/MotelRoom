import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = ({
    children,
    enableScroll = true,
    enableSearch = true,
    footer = true,
}) => {
    return (
        <>
            <Header enableScroll={enableScroll} enableSearch={enableSearch} />
            {children}
            {footer && <Footer />}
        </>
    );
};

export default Layout;
