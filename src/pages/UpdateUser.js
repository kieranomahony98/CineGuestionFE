import React from "react";
import UpdateUserDetails from "components/myDetails/MyDetails";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/light";
import Footer from "components/footers/MiniCenteredFooter.js";

const UpdateUser = () => {
    return <AnimationRevealPage>
        <Header />
        <UpdateUserDetails />
        <Footer />
    </AnimationRevealPage>

}

export default UpdateUser;
