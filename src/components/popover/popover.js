import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Row } from 'reactstrap';
import { ReactComponent as Help } from "feather-icons/dist/icons/help-circle.svg";
export const MoviePopover = ({ toggle, isOpen, body, title }) => {
    title = (title === "weeklyPlaylist") ? "Weekly Playlist" : (title === "monthlyPlaylist") ? "Monthly Playlist" : (title === "allTimePlaylist") ? "All Time Playlist" : title;
    return (
        <Row className="mb-3">
            <Help id="popover1" onMouseEnter={toggle} onMouseLeave={toggle}>Curation Details</Help>
            <Popover placement="right" isOpen={isOpen} target="popover1" toggle={toggle}>
                <PopoverHeader>{title}</PopoverHeader>
                <PopoverBody>{body}</PopoverBody>
            </Popover>
        </Row>
    )
}