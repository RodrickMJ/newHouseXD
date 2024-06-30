import MongoActivityRepository from './MongoActivityRepository';
import LogActivityUseCase from '../aplication/LogActivityUseCase';
import ActivityController from './controllers/ActivityController';
import ActivityService from './controllers/ActivityService';
import MongoDeviceRepository from './MongoDeviceRepository';  
import DeviceUseCase from '../aplication/DeviceUseCase';      
import DeviceController from './controllers/DeviceController'; 

//  actividades
const activityRepository = new MongoActivityRepository();
const logActivityUseCase = new LogActivityUseCase(activityRepository);
const activityController = new ActivityController(logActivityUseCase);
const activityService = new ActivityService(activityRepository);

//  dispositivos
const deviceRepository = new MongoDeviceRepository();  
const deviceUseCase = new DeviceUseCase(deviceRepository);  
const deviceController = new DeviceController(deviceUseCase);  

export {
    activityRepository,
    logActivityUseCase,
    activityController,
    activityService,
    deviceRepository,       
    deviceUseCase,         
    deviceController        
};
