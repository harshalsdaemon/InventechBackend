import express from 'express';

import catchAsyncMiddleware from '../../../bMiddleware/bCatchAsyncMiddleware';
import { redisClient } from '../../../../aConnection/dRedisConnection';
import { BaseOneToManyModel } from '../../aModel/aSetting/eBaseOneToManyModel';


const baseOneToManyController = (Model=BaseOneToManyModel, Label="BaseOneToMany") => ({
  // List
  list: catchAsyncMiddleware(
    async (request: express.Request, response: express.Response, next: express.NextFunction) => {

      // List
      const list = await Model.find()
        .populate("bCreatedBy", "eFirstname eLastname eEmail")
        .populate("bUpdatedBy", "eFirstname eLastname eEmail")
        .populate("cBase", "aTitle");

      // Set Cache
      await redisClient.setex(`${Label.toLowerCase()}-list`, 60, JSON.stringify(list))

      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Listed Successfully`,
        list: list,
      })
    }
  ),

  // Create
  create: catchAsyncMiddleware(
    async (request: express.Request, response: express.Response, next: express.NextFunction) => {

      // console.log(request.body)
      // console.log(request.file)

      // Create
      const create = await Model.create(request.body);

      // Clear Cache
      await redisClient.del(`${Label.toLowerCase()}-list`)
      console.log("Cache cleared...")
      
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Created Successfully`,
        create: create
      })
    }
  ),

  // Retrieve
  retrieve: catchAsyncMiddleware(
    async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      
      // Retrieve
      const retrieve = await Model.findById(request.params.id)
        .populate("bCreatedBy", "eFirstname eLastname eEmail")
        .populate("bUpdatedBy", "eFirstname eLastname eEmail")
        .populate("cBase", "aTitle");

      // Set Cache
      await redisClient.setex(`${Label.toLowerCase()}-retrieve:${request.params.id}`, 60, JSON.stringify(retrieve))

      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Retrieved Successfully`,
        retrieve: retrieve
      })
    }
  ),

  // Update
  update: catchAsyncMiddleware(
    async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      
      // Update
      const update = await Model.findByIdAndUpdate(
        request.params.id,
        request.body, {
          new: true,
          runValidators: true,
          useFindAndMidify: false
        }
      )

      // Clear Cache
      await redisClient.del(`${Label.toLowerCase()}-list`, `${Label.toLowerCase()}-retrieve:${request.params.id}`)
      console.log("Cache cleared...")
      
      // Response
      response.status(201).json({
        success: true,
        message: `${Label} Updated Successfully`,
        update: update
      })
    }
  ),

  // Delete
  delete: catchAsyncMiddleware(
    async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      
      // Delete
      const delete_object = await Model.findOneAndDelete({ _id: request.params.id })

      // Clear Cache
      await redisClient.del(`${Label.toLowerCase()}-list`, `${Label.toLowerCase()}-retrieve:${request.params.id}`)
      console.log("Cache cleared...")
      
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Deleted Successfully`,
        delete_object: delete_object
      })
    }
  )

});

export default baseOneToManyController;
