"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const optionsRequired = {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
};
const postSchema = new mongoose_1.Schema({
    category: optionsRequired,
    title: optionsRequired,
    author: {
        name: optionsRequired,
        avatar: optionsRequired,
    },
    data: optionsRequired,
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});
exports.default = (0, mongoose_1.model)("Posts", postSchema);
