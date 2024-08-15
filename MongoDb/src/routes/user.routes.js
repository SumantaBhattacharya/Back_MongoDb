import { Router } from "express";
import {
    loginUser,
    registerUser
    , logoutUser, refreshAccessToken,
    changeCurrentPassword, getCurrentUser,
    updateAccountDeatails, updatedUserAvatar,
    updateUserCoverImage, getUserChannelProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewere.js";
import { verifyJWT } from "../middlewares/auth.middlewere.js";

const router = Router()
// middlewere
router.route("/register").post(
    upload.fields([// from mutler
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)

// secured routes

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-details").patch(verifyJWT, updateAccountDeatails)

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updatedUserAvatar)//file

router.route("/update-coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

router.route("/watch-history").get(verifyJWT, getWatchHistory)

// getUserChannelProfile
// getWatchHistory
export default router



// http://localhost:8000/api/v1/users/register
// controller registerUser imported
// the information is coming from controller user


