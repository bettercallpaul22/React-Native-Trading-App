import { parse } from "react-native-redash";

export const get_path_X_center = (current_path:string) =>{
    const curves = parse(current_path).curves;
    const start_point = curves[0].to;
    const end_point = curves[curves.length - 1].to;
    const center_X = (start_point.x + end_point.x) / 2
    return center_X;
}
export const get_path_X_center_by_index = (tab_paths:any[], index:number) =>{
    const curves = tab_paths[index].curves;
    const start_point = curves[0].to;
    const end_point = curves[curves.length - 1].to;
    const center_X = (start_point.x + end_point.x) / 2
    return center_X;
}

