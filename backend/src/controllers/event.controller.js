import mongoose from "mongoose";
import { Event } from "../models/event.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addEvent = asyncHandler(async (req,res) => {

    const {name,date,description,url,location,organizer} = req.body

    if(
        [name,date,description,url,location,organizer].some((field)=>{
           field?.trim()===""
        })
       )
       {
           throw new ApiError(400,"The Above Fields are Compulsory")
       }

    const event = await Event.create({name,date,description,url,location,organizer})

    return res.status(200)
    .json(new ApiResponse(200,event,
        "Event Added Successfully"))
})

const showEvents = asyncHandler(async (req,res) => {
    
    const search = "";  
    const event = await Event.find({name :{$regex:search,$options:"i"}})
    .sort({ createdAt: -1 })

    return res.status(200)
    .json(new ApiResponse(200,
        event,
        "Events fetched successfully"))

})

const getEvent = asyncHandler(async (req,res) => {

    const event = await Event.findById(req.params.eventId);
  
    if(!event)
    {
        throw new ApiError(401,"Event not found!!!")
    }
    return res.status(200)
    .json(new ApiResponse(200,
        event,
        "Event fetched successfully"))
})

export {addEvent,showEvents,getEvent}