import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/stroe";

export const useAppDispatch = ()=> useDispatch<AppDispatch>() 