
const  {User} = require("../../../models/userModel");
const { sendMailUtility } = require("../utils/mailUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        // const resetToken = crypto.randomBytes(32).toString("hex");
        // user.resetPasswordToken = resetToken;
        // user.resetPasswordExpires = Date.now() + 3600000; // 1-hour expiry
        // await user.save();

        const token= jwt.sign({ email }, process.env.JWT_SECRET_KEY_RESET_PASSWORD, { expiresIn: 20 * 60 });


        // Send email using the utility function
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/?reset_pasword_token=${token}`;
        const [success, message] = await sendMailUtility({
            email: user.email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}`,
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });
        console.log("Reset password link:", resetLink);

        if (!success) {
            return res.status(500).json({ message: "Failed to send email: " + message });
        }

        res.status(200).json({ message: "Reset link sent to email" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updatePassword = async (req, res) => {
    try {
        const { email } = req.userInfo; // Extracted from JWT
        const { password } = req.body;
       
        const user = await User.findOne({ email });
        if(!password)
        {
            return res.status(400).json({ message: "New password is required" });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        res.status(200).json({ message: "Password updated successfully" });
        // Update the password
        user.password = hashedPassword;
        await user.save();
    }

     catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};