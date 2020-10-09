const express = require('express');
const HttpResponse = require('../models/http-response');
const diary = require('../models/diary');



const createD= async (req,res,next) => {
    const {userId,name,img,tittle,content} =req.body
    const date = userId;
    const createdAt = userId;
    const updatedAt =  userId;
    const createEntry = new diary ({
        date,
        img,
        tittle,
        content,
        createdAt,
        updatedAt
    });
    try {
        await createEntry.save();
    } catch(err) {
        console.log(err)
        const error = new HttpResponse (
            err,
            500
        ); return res.status(500).json({response:error});
    }
    console.log(createEntry);
    res.status(201).json({
        date: createEntry.date,
        img:createEntry.img,
        tittle: createEntry.tittle,
        content:createEntry.content
    });

   };

   const getAllEntry = async(req,res) =>{
       let fetchedEntries;
       
       try {
           fetchedEntries = await diary.find({},'date img tittle content');
       } catch(err) {
           console.log(err)
               const error = new HttpResponse (
                   err,
                   500
               );
               return res.status(500).json({response:error});
           
       }
       res.status(201).json({fetchedEntries});
   };
    
 exports.createD = createD;
 exports.getAllEntry= getAllEntry;