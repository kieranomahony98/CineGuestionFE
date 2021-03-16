import React from 'react';
import { useSelector } from 'react-redux';
import { FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton } from "react-share";
import { Col, Row } from 'reactstrap';

export default ({ generationId }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const shareUrl = `https://cinegestion.netlify.app/movies/generations/single/${generationId}`;
    return (
        <Col>
            <table>
                <tr>
                    <td>
                        <p>Share To Social Media!</p>
                    </td>
                    <td className="mr-2">
                        <FacebookShareButton url={shareUrl} quote={"Check out this movie generation i just made on CineGestion"} hashtag={"#DiscoverMovies #ChooseWhatYouWatch #Easy"}>
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                    </td>
                    <td>
                        <TwitterShareButton url={"Check out this movie generation i just made on CineGestion"} title={""}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                    </td>
                </tr>
            </table>
        </Col>

    )

}