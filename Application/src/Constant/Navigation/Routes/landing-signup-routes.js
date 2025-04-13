const ROUTES = {
    landing: "/",
    login: "/login",
    signup: {
        personal: "/signup/personal",
        contact: "/signup/contact",
        email_opt_verification: "/signup/email-otp-verification/0b7e561cbb0a8c1904a998538fd738221c00d96f64576014ee218a015ff4b8db",
    },
};

export default ROUTES;

// (login) SHA-256 Hash -> 428821350e9691491f616b754cd8315fb86d797ab35d843479e732ef90665324
// (signup/personal) SHA-256 Hash -> 1bfcdbbfc3f85e4c08a4762b5e0579ddaa3c8a66a2b6f7d2c4f82368c9c1a348
// (signup/contact) SHA-256 Hash -> e99ee8d04062a91600e21881c8be6e79f67ad9c2cd4f8f5443f1033204b8b52b
// (/signup/email-otp-verification) SHA-256 Hash -> 0b7e561cbb0a8c1904a998538fd738221c00d96f64576014ee218a015ff4b8db