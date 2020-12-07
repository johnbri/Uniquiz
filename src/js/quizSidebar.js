import QuizSideBarView from './view/quizSidebarView.js';
import React, { useState, useEffect} from "react";
import {roomModel, userModel} from '../index.js';
import useModelProp from './useModelProp.js';


function QuizSidebar (props) {
    const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const userImg = useModelProp(userModel, "img");
    
    return React.createElement(QuizSideBarView, {
        userImg: userImg,
        score: score,
        displayName: displayName,
        });
}

export default QuizSidebar;