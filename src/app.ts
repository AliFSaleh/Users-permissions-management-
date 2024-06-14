import express from 'express'
import { AppDataSource } from './utils/data-source'

AppDataSource.initialize().then(() => {
    
    
    console.log(11111111111111);
})
