import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carsData: [],
  error: null,
  loading: false,
  singleCar: {},
  searchQuery: null,
  brand: [],
  model: [],
  msgData :[],
  loggedAdmin:[],
  

  brandInputVal: "",
  modelInputVal: "",
  carNumberVal: "",
  carDescriptionVal: "",
  carImagesVal: [],
  selectedBrand: "",
  selectedModel: "",
  startdate: "",
  enddate: "",
  userNameVal:"",
  addressVal:'',
  mobileVal:"",
  emailVal:""
  
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    inputHandler: function (state, action) {
      state[action.payload.name] = action.payload.value;
    },

    clearInputs: function (state, action) {
      state.brandInputVal = "";
      state.modelInputVal = "";
      state.carDescriptionVal = "";
      state.carImagesVal = "";
      state.carNumberVal = "";
      state.startdate ="",
      state.enddate = "",
      (state.selectedBrand = ""), (state.selectedModel = "");
      state.addressVal = "",
      state.mobileVal = "",
      state.userNameVal = "",
      state.emailVal = ""

    },

    setCars: function (state, action) {
      state.carsData = action.payload;
    },
    setModel: function (state, action) {
      state.model = action.payload;
    },
    setBrand: function (state, action) {
      state.brand = action.payload;
    },
    setSelectedModel: function (state, action) {
      state.selectedModel = action.payload;
    },
    setSelectedBrand: function (state, action) {
      state.selectedBrand = action.payload;
    },
    setSearchQuery: function (state, action) {
      state.searchQuery = action.payload;
    },
    setLoading: function (state, action) {
      state.loading = action.payload;
    },
    setSingleCar: function (state, action) {
      state.singleCar = action.payload;
    },
    setStartDate: function (state, action) {
      state.startdate = action.payload;
    },
    setEndDate: function (state, action) {
      state.enddate = action.payload;
    },
    setMsgData: function (state, action) {
      state.msgData = action.payload;
    },
    setLoggedAdmin :function(state,action) {
      state.loggedAdmin = action.payload
    }
  },
});

export const {
  inputHandler,
  clearInputs,
  setSelectedBrand,
  setSelectedModel,
  setSearchQuery,
  setCars,
  setBrand,
  setModel,
  setLoading,
  setSingleCar,
  setMsgData,
  setLoggedAdmin
} = carsSlice.actions;

export default carsSlice.reducer;
