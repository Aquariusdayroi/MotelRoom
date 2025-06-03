import Footer from "./components/Footer";
import Header from "./components/Header";
import HeaderWhite from "./components/HeaderWhite";

const Layout = ({
    children,
    enableScroll = true,
    enableSearch = true,
    footer = true,
    useHeaderWhite = false,
}) => {
    return (
        <>
            {!useHeaderWhite && (
                <Header
                    enableScroll={enableScroll}
                    enableSearch={enableSearch}
                />
            )}
            {useHeaderWhite && <HeaderWhite />}
            {children}
            {footer && <Footer />}
        </>
    );
};

export default Layout;
