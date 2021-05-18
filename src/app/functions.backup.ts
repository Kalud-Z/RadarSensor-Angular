// check_parameter(parameter) {
//   console.log('check_parameter is called');
//   console.log('this is param : ' , parameter);
//   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
//
//   let name = parameter.name;
//   let input_id = 'parameter_input_' + name;
//
//   console.log('this is name     : ' , name)
//   console.log('this is input_id : ' , input_id)
//
//   // let gg  = $("#" + input_id);
//   // let zz = document.getElementById(input_id).value  as HTMLSelectElement;
//   // let zzVAl = zz.value;
//   //
//   // console.log('elem : ' , gg);
//   // console.log('elem by id : ' , zz);
//   // console.log('val : ' , zzVAl);
//
//   let currentElement = document.getElementById(input_id) as HTMLSelectElement;
//   let value_new = currentElement.value;
//
//   let value_old = parameter.current_value;
//
//   let value: number | string;
//   let min;
//   let max;
//
//   switch (parameter.type) {
//     case "L": // list: correct by design
//       break;
//
//     case "I":
//       // int: auto correct values if limits exceeded
//       value = parseInt($("#" + input_id).val() as string);
//       if (isNaN(value)) { value = 0; $("#" + input_id).val(value) }
//       min = parameter.allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[0];
//       max = parameter.allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[1];
//       if (min != this.NO_LIMIT && value < parseInt(min)) { $("#" + input_id).val(parseInt(min)) }
//       if (max != this.NO_LIMIT && value > parseInt(max)) { $("#" + input_id).val(parseInt(max)) }
//       break;
//
//     case "F":
//       // float: auto correct values if limits exceeded
//       value = parseFloat($("#" + input_id).val() as string);
//       if (isNaN(value)) value = 0;
//       min = parameter.allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[0];
//       max = parameter.allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[1];
//       if (min != this.NO_LIMIT && value < parseFloat(min)) {  $("#" + input_id).val(parseFloat(min)) }
//       if (max != this.NO_LIMIT && value > parseFloat(max)) {  $("#" + input_id).val(parseFloat(max)) }
//       // show float values in exponential number format
//       $("#" + input_id).val(parseFloat($("#" + input_id).val() as string).toExponential(this.FLOAT_FRACTION_DIGITS));
//       break;
//
//     default:
//       console.log("ERROR: Unknown type " + parameter.type + " for cfg parameter " + name);
//   }
//
//   // request update of cfg parameter value only if parameter value changed
//   value = $("#" + input_id).val() as number;
//   if (value_old != value) {
//     this.mainService.send_cmd(this.mainService.rc_cmds.CMD_RC_CFG_VALUE, name, value);
//     // cfg_file_current = ''; // clear name of currently loaded cfg file if a parameter value has changed
//     this.mainService.set_cfg_file_current(''); // clear name of currently loaded cfg file if a parameter value has changed
//     this.valueOf_ctl_cfg_file_load_name = '';
//   }
//
//   // store new parameter value
//   parameter.current_value = $("#" + input_id).val();
// }




// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
