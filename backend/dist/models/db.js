"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = require("mongoose");
const connectToDB = async () => {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/TimesHub');
        console.log('✅ Connected to MongoDB');
    }
    catch (err) {
        console.log('❌ Failed to connect to MongoDB:', err);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
//# sourceMappingURL=db.js.map