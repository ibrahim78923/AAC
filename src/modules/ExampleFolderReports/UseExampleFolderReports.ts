// import { useState } from "react";

// import { useAppDispatch, useAppSelector } from "../../../store/store";

// // import { ribbonsformValues } from "../../../mock-data/account-settings-mock-data";
// import { useAppAlert } from "../../../components/app-alert/use-app-alert";
// import { addRibbonsPostThunk } from "../../../store/ribbons/ribbon-thunk-action";
// import { useAxiosInterceptors } from "../../../hooks/use-axios-interceptors";
// import { ribbonButtonsDynamic, ribbonFormDataDynamic, selectOffer } from "./add-ribbon-data";

// export const useAddRibbon = (props: any) => {
//   const axiosInstance = useAxiosInterceptors()

//   const { showRibbonCard , setValue} = props;
//   // console.log(props)
//   const showtheribbonForm = useAppSelector(state => state.ribbons.showRibbonForm)
//   const { referenceData } = useAppSelector(state => state)
//   const { ribbons } = useAppSelector(state => state)

//   const [nameSelect, setNameSelect] = useState<string | null>("");
//   const [addribbonImage, setAddribbonImage] = useState<string>("");
//   const [offerData, setOfferData] = useState(selectOffer[0])
//   const [isRibbonPreviewModal, setIsRibbonPreviewModal] = useState(false);

//   const { auth } = useAppSelector(state => state)
//   const { personalUser } = useAppSelector(state => state)

//   const { openAlert } = useAppAlert();

//   const ribbonsformValues = {
//     title: '',
//     category: '',
//     offer: '',
//     startDate: "",
//     endDate: "",
//     userImageId: "",
//   };

//   const dispatch = useAppDispatch();

//   const selectRibbonName = (ribbonsName: string, img: string, setFormik: any) => {
//     setIsRibbonPreviewModal(nameSelect !== ribbonsName)
//     nameSelect === ribbonsName ? setNameSelect('') : setNameSelect(ribbonsName);
//     addribbonImage === img ? setAddribbonImage('') : setAddribbonImage(img)
//     addribbonImage === img ? setFormik("userImageId", '') : setFormik("userImageId", img)
//   };

//   const changeoffer = (e: any) => {
//     setOfferData(selectOffer.find((singleOffer: any) => singleOffer.type === e.target.value) as any)

//   }
//   const ribbonFormData = ribbonFormDataDynamic(changeoffer, offerData, referenceData.ribbons);
//   const ribbonButtons: any[] = ribbonButtonsDynamic(showRibbonCard, ribbons.status, showtheribbonForm)

//   const formSubmitHandler = (formValues: any) => {
//     const { title, category, offer } = formValues;
//     if (title === '' || category === '' || offer === '') {
//       setValue(6);
//       return;
//     }
//     // console.log(formValues, 'images')
//     const ribbonData = {
//       userId: `${auth?.user?.userId}`,
//       title: formValues.title,
//       category: formValues.category,
//       offer: formValues.offer,
//       ribbonImage: addribbonImage,
//       startDate: formValues.startDate,
//       endDate: formValues.endDate,
//     };
//     // console.log(ribbonData)
//     dispatch(addRibbonsPostThunk({ ribbonData, openAlert, axiosInstance, showRibbonCard, dispatch, personalUser })
//     );
//   }
//   return {

//     formSubmitHandler,
//     selectRibbonName,
//     addribbonImage,
//     ribbons,
//     ribbonsformValues,
//     showRibbonCard,
//     ribbonButtons,
//     isRibbonPreviewModal, setIsRibbonPreviewModal,
//     ribbonFormData,
//     nameSelect,
//     referenceData,
//     auth
//   };
// };
