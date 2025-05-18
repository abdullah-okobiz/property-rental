import { Router } from 'express';
import UserMiddlewares from '../../modules/user/user.middlewares';
import RentControllers from '../../modules/rent/rent.controllers';
import upload from '../../middlewares/multer.middleware';
import { UserRole } from '../../interfaces/jwtPayload.interfaces';

const { checkAccessToken, isHost, allowRole } = UserMiddlewares;
const {
  handleInitializeRentListing,
  handleProgressCreatingRentListing,
  handleUploadImage,
  handleUnlinkImage,
  handleGetAllHostListedPropertiesForRent,
  handleChangeStatus,
  handleGetAllRent,
  handleDeleteListedRentItem,
  handleCreateRent,
  handleRetrieveOneListedRent,
} = RentControllers;
const router = Router();

router.route('/host/rent/new').post(checkAccessToken, isHost, handleInitializeRentListing);
router
  .route('/host/create-new-rent')
  .post(checkAccessToken, isHost, upload.array('rentImages'), handleCreateRent);
router.route('/host/rent/:id').patch(checkAccessToken, isHost, handleProgressCreatingRentListing);

router
  .route('/host/rent/upload/:id')
  .patch(checkAccessToken, isHost, upload.array('rentImages'), handleUploadImage)

  .delete(checkAccessToken, isHost, handleUnlinkImage);

router.route('/host/rent').get(checkAccessToken, isHost, handleGetAllHostListedPropertiesForRent);

router
  .route('/admin/rent/:id')
  .patch(
    checkAccessToken,
    allowRole(UserRole.Admin, UserRole.ListingVerificationManager),
    handleChangeStatus
  )
  .delete(
    checkAccessToken,
    allowRole(UserRole.Admin, UserRole.ListingVerificationManager),
    handleDeleteListedRentItem
  );

router.route('/rent').get(handleGetAllRent);
router.route('/rent/:slug').get(handleRetrieveOneListedRent);

export default router;
