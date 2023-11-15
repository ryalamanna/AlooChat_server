import {asyncHandler} from '../../../utils/asyncHandler.js'
import { Chat } from "../../../models/apps/chat/chat.models.js";
import { ChatMessage } from "../../../models/apps/chat/message.models.js";
import mongoose from "mongoose";
import { ApiResponse } from '../../../utils/ApiResponse.js';

const chatMessageCommonAggregation = () => {
    return [
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "sender",
          as: "sender",
          pipeline: [
            {
              $project: {
                username: 1,
                avatar: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          sender: { $first: "$sender" },
        },
      },
    ];
  };

export const getAllMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
  
    const selectedChat = await Chat.findById(chatId);

  
    if (!selectedChat) {
      throw new ApiError(404, "Chat does not exist");
    }
  
    // Only send messages if the logged in user is a part of the chat he is requesting messages of
    if (!selectedChat.participants?.includes(req.user?._id)) {
      throw new ApiError(400, "User is not a part of this chat");
    }
  
    const messages = await ChatMessage.aggregate([
      {
        $match: {
          chat: new mongoose.Types.ObjectId(chatId),
        },
      },
      ...chatMessageCommonAggregation(),
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    console.log(messages);

  
    return res
      .status(200)
      .json(
        new ApiResponse(200, messages || [], "Messages fetched successfully")
      );
  });