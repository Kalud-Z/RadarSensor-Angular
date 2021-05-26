import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export interface Parameter {
  name: string | any,
  current_value: string | any,
  text: string | any,
  type: string | any,
  allowed_values: string | any
}



@Injectable({
  providedIn: 'root'
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
 export class MainService {


  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  basics.ts  §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§


  // constructor for structs
  struct = (...keys) => ((...v) => keys.reduce((o, k, i) => {o[k] = v[i]; return o} , {})) ; //it is used outside

  // convert array buffer to string and strip off trailing 0's
  decoder = new TextDecoder("utf-8");

  arraybuffer2string(buf) { //it is used outside
    let decoded_string = this.decoder.decode(new Uint8Array(buf));
    // remove trailing 0-bytes
    let str = decoded_string.split(String.fromCharCode(0));
    return str[0];
  }

  // status handling | //it is used outside
  states_struct = this.struct('name', 'status');

  status_clearall(status_array) {
    status_array.forEach(element => element.status = 0);
  }

  status_set(status_array, status_name) {
    // 	status_array[status_array.findIndex(element => element.name == status_name)].status = 1;
    status_array.find(e => e.name == status_name).status = 1;
  }

  status_clear(status_array, status_name) {
    // 	status_array[status_array.findIndex(element => element.name == status_name)].status = 0;
    status_array.find(e => e.name == status_name).status = 0;
  }

  status_isset(status_array, status_name) {
    // 	if (status_array[status_array.findIndex(element => element.name == status_name)].status == 1) return true;
    // 	else return false;
    if (status_array.find(e => e.name == status_name).status == 1) return true;
    else return false;
  }

  status_iscomplete(status_array) {
    let total_status = 0;
    status_array.forEach(element => total_status += element.status);
    if (total_status == status_array.length) return true;
    else return false;
  }


  // websockets handling
  // ws state
  ws_states = { 'WS_STATE_DISCONNECTED': 0, 'WS_STATE_CONNECTED': 1 }; //it is used outside
  // Object.freeze(ws_states); // TODO : do i need to run this in ngOnInit

  ws_state = this.ws_states.WS_STATE_DISCONNECTED;
  set_ws_state(k) { this.ws_state = k }

  // ws object
  ws: any;  set_ws(k) { this.ws = k }

  // return appropriate websockets URL
//   get_appropriate_ws_url(extra_url) //use this  when frontend code is hosted on the board.
// {
//   let pcol;
//   let u = document.URL;
//
//   /*
//    * We open the websocket encrypted if this page came on an
//    * https:// url itself, otherwise unencrypted
//    */
//
//   if (u.substring(0, 5) === "https") {
//     pcol = "wss://";
//     u = u.substr(8);
//   } else {
//     pcol = "ws://";
//     if (u.substring(0, 4) === "http")
//       u = u.substr(7);
//   }
//
//   u = u.split("/");
//
//   /* + "/xxx" bit is for IE10 workaround */
//
//   return pcol + u[0] + "/" + extra_url;
// }


  // open websocket
  new_ws(urlpath, protocol)  {
    console.log('now creating a ws');
    return new WebSocket(urlpath, protocol);
  }



  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  graphics.ts (only variables used outside of graphics)  §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

   graphics_states = [
     this.states_struct('GRAPHICS_STATE_NODES_NAMES',		0),
     this.states_struct('GRAPHICS_STATE_NODES_OMODES',	0),
     this.states_struct('GRAPHICS_STATE_SCALES',			0)
  ];

   nodes_names;   set_nodes_names(n) { this.nodes_names = n }
   nodes_omodes;   set_nodes_omodes(n) { this.nodes_omodes = n }

   // incoming data type/size/start/range
   data_datatype;         set_data_datatype(k) { this.data_datatype = k }
   data_bitwidth;         set_data_bitwidth(k) { this.data_bitwidth = k }
   data_image_size_x;     set_data_image_size_x(k) { this.data_image_size_x = k }
   data_image_size_y;     set_data_image_size_y(k) { this.data_image_size_y = k }
   data_image_start_x;    set_data_image_start_x(k) { this.data_image_start_x = k }
   data_image_start_y;    set_data_image_start_y(k) { this.data_image_start_y = k }
   data_image_range_x;    set_data_image_range_x(k) { this.data_image_range_x = k }
   data_image_range_y;    set_data_image_range_y(k) { this.data_image_range_y = k }


    // scales
   scale_legend_x: string;      set_scale_legend_x(k) { this.scale_legend_x = k }
   scale_legend_y: string;      set_scale_legend_y(k) { this.scale_legend_y = k }
   scale_world_start_x;   set_scale_world_start_x(k) { this.scale_world_start_x = k }
   scale_world_start_y;   set_scale_world_start_y(k) { this.scale_world_start_y = k }
   scale_world_range_x;   set_scale_world_range_x(k) { this.scale_world_range_x = k }
   scale_world_range_y;   set_scale_world_range_y(k) { this.scale_world_range_y = k }

  // resolution / bin
  res_x; set_res_x(k) { this.res_x = k }
  res_y; set_res_y(k) { this.res_y = k }



  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  config_parameters.ts (only variables used outside of config_parameters) §§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

    RE_TOKEN_DELIMS = /[;\n]+/;
    TOKEN_DELIMITER = ";"

    cfg_parameters_states = [
      this.states_struct('CFG_PARAMETERS_STATE_COUNT',		0),
      this.states_struct('CFG_PARAMETERS_STATE_VALUES',	0),
   ];


    cfg_parameter_value_struct = this.struct(
    'name',
    'current_value',
    'text',
    'type',
    'allowed_values'
    );



   cfg_parameter_value: Parameter[] = [];
   cfg_parameter_count = 0; set_cfg_parameter_count(num) { this.cfg_parameter_count = num }


    init_parameters() {
      this.cfg_parameter_count = 0;
      this.cfg_parameter_value = [];
      this.status_clearall(this.cfg_parameters_states);
  }



  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  controls.ts (not everything, because its a DOM_FILE) §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

  trigger_id;    set_trigger_id(k) { this.trigger_id = k }

  rc_states = {
      'RC_STATE_UNDEFINED': 0,
      'RC_STATE_HALT':      1,
      'RC_STATE_GO':        2,
      'RC_STATE_QUIT':      3
    };
  // Object.freeze(rc_states); //TODO : do

  public rc_state: number = 0; set_rc_state(state : number) { this.rc_state = state }

  controls_states = [
     this.states_struct('CONTROLS_STATE_CFG_FILES',	0),
     this.states_struct('CONTROLS_STATE_STATUS',		0)
   ];

  ctl_nruns;  set_ctl_nruns(k) { this.ctl_nruns = k }


  // cfg file list
  cfg_file_current: string = '';
  set_cfg_file_current(file) { this.cfg_file_current = file }

   cfg_file_list: string[] = [];
   set_cfg_file_list(list) {
     this.cfg_file_list = list;
     // console.log('this is cfg_file_list : ' , this.cfg_file_list)
   }


   display_mode_info_struct = this.struct(
    'mode',
    'node_name_required',
    'match_to_pipeline'
   );


   display_mode_info: any[] = [
      this.display_mode_info_struct('R/D Map',	'FFT2ABSLOG', 'RDMAP'),
      this.display_mode_info_struct('CFAR',	'CFAR'		, 'CFAR')
  ];


   display_mode_list: string[];  set_display_mode_list(k: string[]) { this.display_mode_list = k; }
   display_node_index_list;   set_display_node_index_list(k) { this.display_node_index_list = k }

   node_index_required: any



  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  headers.ts  §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

    init_controls$ = new Subject<boolean>();
    init_graphics$ = new Subject<boolean>();
    update_graphics$ = new Subject<boolean>();

    nodes_headers: any;


  // header tags
    HEADER_TAG_PIPELINE = "PH";
    HEADER_TAG_NODE = "NH";
    HEADER_TAG_DATA = "DH";
    HEADER_TAG_COMMAND = "CH";

    // user data in headers
    HEADER_USER_DATA_SIZE = 2;

    // type header
    TYPE_HEADER_SIZE_BYTES = 4 + 4 * this.HEADER_USER_DATA_SIZE;  //being used outside as well

    type_header_struct = this.struct(
    'tag',
    'value',
    'user_data'
  );


    arraybuffer2type_header(arraybuffer) { //being used outside as well
    let dv = new DataView(arraybuffer);
    let offset_tag = 0;
    let offset_value = 2;
    let offset_user_data = 4;

    return this.type_header_struct(
      this.arraybuffer2string(arraybuffer.slice(offset_tag, offset_value)),
      dv.getInt16(offset_value, true),
      arraybuffer.slice(offset_user_data)
    );
  }

      // node header
    NODE_HEADER_SIZE_BYTES = 100 + 4 * this.HEADER_USER_DATA_SIZE;
    NODE_LABEL_SIZE_BYTES = 31;
    node_header_struct = this.struct(
    'tag',
    'mode',
    'label_x',
    'label_y',
    'datatype',
    'bitwidth',
    'image_size_x',
    'image_start_x',
    'image_range_x',
    'image_size_y',
    'image_start_y',
    'image_range_y',
    'world_start_x',
    'world_range_x',
    'world_start_y',
    'world_range_y',
    'bufadr_p',
    'user_data'
  );

    arraybuffer2node_header(arraybuffer, node_index) {
    let dv = new DataView(arraybuffer);

    let offset_tag = this.TYPE_HEADER_SIZE_BYTES + node_index * this.NODE_HEADER_SIZE_BYTES;
    let offset_mode = offset_tag + 2;
    let offset_labels = offset_mode + 2;
    let offset_datatype = offset_labels + 2 * this.NODE_LABEL_SIZE_BYTES;
    let offset_bitwidth = offset_datatype + 1;
    let offset_image = offset_bitwidth + 1;
    let offset_world = offset_image + 12;
    let offset_bufadr = offset_world + 16;
    let offset_user_data = offset_bufadr + 4;

    return this.node_header_struct(
      this.arraybuffer2string(arraybuffer.slice(offset_tag, offset_tag + 2)),
      dv.getUint16(offset_mode, true),
      this.arraybuffer2string(arraybuffer.slice(offset_labels, offset_labels + this.NODE_LABEL_SIZE_BYTES)),
      this.arraybuffer2string(arraybuffer.slice(offset_labels + this.NODE_LABEL_SIZE_BYTES, offset_labels + 2 * this.NODE_LABEL_SIZE_BYTES)),
      this.arraybuffer2string(arraybuffer.slice(offset_datatype, offset_datatype + 1)),
      dv.getUint8(offset_bitwidth),
      dv.getUint16(offset_image, true),
      dv.getUint16(offset_image + 2, true),
      dv.getUint16(offset_image + 4, true),
      dv.getUint16(offset_image + 6, true),
      dv.getUint16(offset_image + 8, true),
      dv.getUint16(offset_image + 10, true),
      dv.getFloat32(offset_world, true),
      dv.getFloat32(offset_world + 4, true),
      dv.getFloat32(offset_world + 8, true),
      dv.getFloat32(offset_world + 12, true),
      dv.getUint32(offset_bufadr, true),
      arraybuffer.slice(offset_user_data)
    );
  }


    process_pipeline_headers(data_buffer) { //TODO : this one is NOT supposed to be called with each new image.
    let number_of_nodes = this.arraybuffer2type_header(data_buffer.slice(0, this.TYPE_HEADER_SIZE_BYTES)).value;
    this.nodes_headers = []; // TODO : this wouldn't work. you need initialize all indexes with 0 at first, then change them.

    for (let i = 0; i < number_of_nodes; i++) {
      this.nodes_headers[i] = this.arraybuffer2node_header(data_buffer, i);
    }

    // cfg_parameters and controls must be fully configured before
    if ((!this.status_iscomplete(this.cfg_parameters_states)) ||
      (!this.status_iscomplete(this.controls_states))) {
      // reset cfg_parameters/controls, request initial config
      console.log("WARNING: Pipeline header received, but basic configuration is not complete");
      this.init_parameters();

      // init_controls(); //subject
      this.init_controls$.next(true);

      this.request_initial_config();
      return;
    }

    // nodes names and nodes output modes must be configured before
    if ((!this.status_isset(this.graphics_states, 'GRAPHICS_STATE_NODES_NAMES')) ||
      (!this.status_isset(this.graphics_states, 'GRAPHICS_STATE_NODES_OMODES'))) {
      // reset graphics, request nodes names/omodes
      console.log("WARNING: Pipeline header received, but nodes names/output configuration not complete");

      // init_graphics(); //subject
      this.init_graphics$.next(true);

      this.send_cmd(this.rc_cmds.CMD_RC_NODES_NAMES);
      this.send_cmd(this.rc_cmds.CMD_RC_NODES_OMODES);
      return;
    }

    // no nodes to be displayed -> setup graphics with default values
    if (this.node_index_required < 0) {
      console.log('inside process_pipelines_headers() . inside this.node_index_required < 0 . setting scale_legend_x to (range) ')
      this.set_scale_legend_x('range');
      this.set_scale_legend_y('velocity');
      this.set_data_datatype('U');
      this.set_data_bitwidth(8);
      this.set_data_image_size_x(1);
      this.set_data_image_size_y(1);
      this.set_data_image_start_x(0);
      this.set_data_image_start_y(0);
      this.set_data_image_range_x(0);
      this.set_data_image_range_y(0);
      this.set_scale_world_start_x(0);
      this.set_scale_world_start_y(0);
      this.set_scale_world_range_x(0);
      this.set_scale_world_range_y(0);
      this.set_res_x(0);
      this.set_res_y(0);
      this.status_set(this.graphics_states, 'GRAPHICS_STATE_SCALES');

      this.update_graphics$.next(true);

      return;
    }


    // console.log('this is nodes_headers : ' , this.nodes_headers);
    // console.log('this is this.node_index_required : ' , this.node_index_required);
    // console.log('#####################################################################');

    // console.log('scale_legend_x :  ' , this.scale_legend_x !== this.nodes_headers[this.node_index_required].label_x);
    // console.log('scale_legend_y :  ' , this.scale_legend_y != this.nodes_headers[this.node_index_required].label_y);
    //
    // console.log('scale_legend_x :  ' , this.scale_legend_x);
    // console.log('scale_legend_y :  ' , this.scale_legend_y);

    // console.log('data_datatype :  ' ,this.data_datatype != this.nodes_headers[this.node_index_required].datatype)
    // console.log('data_bitwidth :  ' ,this.data_bitwidth != this.nodes_headers[this.node_index_required].bitwidth)
    // console.log('data_image_size_x :  ' ,this.data_image_size_x != this.nodes_headers[this.node_index_required].image_size_x)
    // console.log('data_image_size_y :  ' ,this.data_image_size_y != this.nodes_headers[this.node_index_required].image_size_y)
    // console.log('data_image_start_x :  ' ,this.data_image_start_x != this.nodes_headers[this.node_index_required].image_start_x)
    // console.log('data_image_start_y :  ' ,this.data_image_start_y != this.nodes_headers[this.node_index_required].image_start_y)
    // console.log('data_image_range_x :  ' ,this.data_image_range_x != this.nodes_headers[this.node_index_required].image_range_x)
    // console.log('data_image_range_y :  ' ,this.data_image_range_y != this.nodes_headers[this.node_index_required].image_range_y)
    // console.log('scale_world_start_x :  ' ,this.scale_world_start_x != this.nodes_headers[this.node_index_required].world_start_x)
    // console.log('scale_world_start_y :  ' ,this.scale_world_start_y != this.nodes_headers[this.node_index_required].world_start_y)
    // console.log('scale_world_range_x :  ' ,this.scale_world_range_x != this.nodes_headers[this.node_index_required].world_range_x)
    // console.log('scale_world_range_y :  ' ,this.scale_world_range_y != this.nodes_headers[this.node_index_required].world_range_y)

      console.log('#####################################################################');
      console.log('#####################################################################');
      console.log('#####################################################################');


      // take the new scales parameters if parameters changed
    let scale_parameters_changed = (
      (this.scale_legend_x !== this.nodes_headers[this.node_index_required].label_x) ||
      (this.scale_legend_y !== this.nodes_headers[this.node_index_required].label_y) ||
      (this.data_datatype !== this.nodes_headers[this.node_index_required].datatype) ||
      (this.data_bitwidth !== this.nodes_headers[this.node_index_required].bitwidth) ||
      (this.data_image_size_x !== this.nodes_headers[this.node_index_required].image_size_x) ||
      (this.data_image_size_y !== this.nodes_headers[this.node_index_required].image_size_y) ||
      (this.data_image_start_x !== this.nodes_headers[this.node_index_required].image_start_x) ||
      (this.data_image_start_y !== this.nodes_headers[this.node_index_required].image_start_y) ||
      (this.data_image_range_x !== this.nodes_headers[this.node_index_required].image_range_x) ||
      (this.data_image_range_y !== this.nodes_headers[this.node_index_required].image_range_y) ||
      (this.scale_world_start_x !== this.nodes_headers[this.node_index_required].world_start_x) ||
      (this.scale_world_start_y !== this.nodes_headers[this.node_index_required].world_start_y) ||
      (this.scale_world_range_x !== this.nodes_headers[this.node_index_required].world_range_x) ||
      (this.scale_world_range_y !== this.nodes_headers[this.node_index_required].world_range_y)
    );


      if (scale_parameters_changed) {
      this.set_scale_legend_x(this.nodes_headers[this.node_index_required].label_x);
      this.set_scale_legend_y(this.nodes_headers[this.node_index_required].label_y);
      this.set_data_datatype(this.nodes_headers[this.node_index_required].datatype);
      this.set_data_bitwidth(this.nodes_headers[this.node_index_required].bitwidth);
      this.set_data_image_size_x(this.nodes_headers[this.node_index_required].image_size_x);
      this.set_data_image_size_y(this.nodes_headers[this.node_index_required].image_size_y);
      this.set_data_image_start_x(this.nodes_headers[this.node_index_required].image_start_x);
      this.set_data_image_start_y(this.nodes_headers[this.node_index_required].image_start_y);
      this.set_data_image_range_x(this.nodes_headers[this.node_index_required].image_range_x);
      this.set_data_image_range_y(this.nodes_headers[this.node_index_required].image_range_y);
      this.set_scale_world_start_x(this.nodes_headers[this.node_index_required].world_start_x);
      this.set_scale_world_start_y(this.nodes_headers[this.node_index_required].world_start_y);
      this.set_scale_world_range_x(this.nodes_headers[this.node_index_required].world_range_x);
      this.set_scale_world_range_y(this.nodes_headers[this.node_index_required].world_range_y);
      this.set_res_x(this.scale_world_range_x / (this.data_image_range_x - 1));
      this.set_res_y(this.scale_world_range_y / (this.data_image_range_y - 1));
      this.status_set(this.graphics_states, 'GRAPHICS_STATE_SCALES');

      this.update_graphics$.next(true); //TODO : this is one is being called with each new image. while it shouldnt !

    }
  }



  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  commands.ts  §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

  set_data_invalid_marker$ = new Subject<boolean>();
  update_parameters$ = new Subject<boolean>();
  update_cfg_file_list$ = new Subject<boolean>();
  update_controls$ = new Subject<boolean>();
  update_display_mode_list$ = new Subject<boolean>();
  clear_data_invalid_marker$ = new Subject<boolean>();
  update_trigger$ = new Subject<boolean>();


  rc_cmds = {
    'CMD_RC_CFG_UNKNOWN':	  -1,
    'CMD_RC_UNKNOWN':	  0,
    'CMD_RC_RUN_GO':			  1,
    'CMD_RC_RUN_TRIGGER':	  2,
    'CMD_RC_RUN_HALT':		  3,
    'CMD_RC_RUN_QUIT':		  4,
    'CMD_RC_RUN_STATUS':	  5,
    'CMD_RC_HW_UP':				  6,
    'CMD_RC_HW_FINISHED':	  7,
    'CMD_RC_HW_DOWN':			  8,
    'CMD_RC_DATA_VALID':	  9,
    'CMD_RC_DATA_INVALID':  10,
    'CMD_RC_CFG_COUNT':		  11,
    'CMD_RC_CFG_VALUE':		  12,
    'CMD_RC_CFG_LOAD':		  13,
    'CMD_RC_CFG_SAVE':		  14,
    'CMD_RC_CFG_FILES':		  15,
    'CMD_RC_NODES_NAMES':	  16,
    'CMD_RC_NODES_OMODES':  17,
    'CMD_RC_FFIN_ADD':		  18,
    'CMD_RC_FFOUT_ADD':		  19
  };

  // Object.freeze(rc_cmds); //TODO : call this in ngOnInit

    cmds_struct = this.struct(
    'rc_cmd',
    'cmd_long',
    'cmd_short',
    'response_needed'
  );

    cmds = [
      this.cmds_struct(this.rc_cmds.CMD_RC_UNKNOWN,		'', 					      '',		0), // TODO :  did you mean 'CMD_RC_CFG_UNKNOWN' ?
      this.cmds_struct(this.rc_cmds.CMD_RC_RUN_GO,			  'rc_run_go', 	      'rg',	1),
      this.cmds_struct(this.rc_cmds.CMD_RC_RUN_TRIGGER,	  'rc_run_trigger',	  'rt',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_RUN_HALT,		  'rc_run_halt', 		  'rh',	1),
      this.cmds_struct(this.rc_cmds.CMD_RC_RUN_QUIT,		  'rc_run_quit', 		  'rq',	1),
      this.cmds_struct(this.rc_cmds.CMD_RC_RUN_STATUS,	  'rc_run_status', 	  'rs',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_HW_UP,			    'rc_hw_up',			 	  'hu',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_HW_FINISHED,	  'rc_hw_finished',	  'hf',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_HW_DOWN,			  'rc_hw_down',		 	  'hd',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_DATA_VALID,	  'rc_data_valid',	  'dv',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_DATA_INVALID,  'rc_data_invalid',  'di',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_CFG_COUNT,		  'rc_cfg_count', 	  'cc',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_CFG_VALUE,		  'rc_cfg_value', 	  'cv',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_CFG_LOAD,		  'rc_cfg_load', 		  'cl',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_CFG_SAVE,		  'rc_cfg_save', 		  'cs',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_CFG_FILES,		  'rc_cfg_files', 	  'cf',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_NODES_NAMES,	  'rc_nodes_names',   'nn',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_NODES_OMODES,  'rc_nodes_omodes',  'no',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_FFIN_ADD,		  'rc_ffin_add', 		  'ia',	0),
      this.cmds_struct(this.rc_cmds.CMD_RC_FFOUT_ADD,		  'rc_ffout_add', 	  'oa',	0)
  ];


   rc_cmd_sent = -1;   set_rc_cmd_sent(k) { this.rc_cmd_sent = k }


    cmd_short2rc_cmd(cmd_short): number {
    let rc_cmd = this.rc_cmds.CMD_RC_UNKNOWN;
      this.cmds.forEach(key => (key.cmd_short == cmd_short) && (rc_cmd = key.rc_cmd))
    return rc_cmd;
  }


    cmd_long2rc_cmd (cmd_long) {
    let rc_cmd = this.rc_cmds.CMD_RC_UNKNOWN;
      this.cmds.forEach(key => (key.cmd_long == cmd_long) && (rc_cmd = key.rc_cmd))
    return rc_cmd;
  }


    rc_cmd2cmd_short(rc_cmd) {
    let cmd_short = 'xx';
      this.cmds.forEach(key => (key.rc_cmd == rc_cmd) && (cmd_short = key.cmd_short))
    return cmd_short;
  }


    send_cmd(rc_cmd, ...args) {
    let sendstring = this.rc_cmd2cmd_short(rc_cmd) + this.TOKEN_DELIMITER + [...args].join(this.TOKEN_DELIMITER) + "\n";

    // console.log('inside send_cmd . ws_state : ' , this.ws_state);

    if (this.ws_state == this.ws_states.WS_STATE_CONNECTED) {
      // console.log('inside send_cmd . yes ws is connected')
      // no unresponded cmds before sending a new one
      if (this.rc_cmd_sent == -1) {
        this.ws.send(sendstring);
        if (this.cmds[rc_cmd].response_needed) this.rc_cmd_sent = rc_cmd;
      }
      else {
        console.log("WARNING: Can't send command " + sendstring + ". Still waiting for response to command " + this.rc_cmd2cmd_short(this.rc_cmd_sent));
      }
    }
    else {
      // console.log('inside send_cmd .  ws is NOT connected')
      console.log("ws send: Not connected - can't send \"" + sendstring + "\"");
    }
  }


    request_initial_config() {
    // cfg_parameters
      this.send_cmd(this.rc_cmds.CMD_RC_CFG_COUNT);
      this.send_cmd(this.rc_cmds.CMD_RC_CFG_VALUE);

    // control
      this.send_cmd(this.rc_cmds.CMD_RC_CFG_FILES);
      this.send_cmd(this.rc_cmds.CMD_RC_RUN_STATUS);

    // graphics
      this.send_cmd(this.rc_cmds.CMD_RC_NODES_NAMES);
      this.send_cmd(this.rc_cmds.CMD_RC_NODES_OMODES);
  }



  process_cmd (data_buffer) {  //TODO : this is an extremely long function. => break it down into lil ones.
    // convert command string into array of strings
    let cmd_array: string[] = this.arraybuffer2string(data_buffer.slice(this.TYPE_HEADER_SIZE_BYTES)).split(this.RE_TOKEN_DELIMS);
    // console.log('cmd_Array : ' , cmd_array);

    // remove empty last element if present
    if (cmd_array[cmd_array.length - 1] == "") cmd_array = cmd_array.slice(0, cmd_array.length - 1)

    // do we know this command?
    let rc_cmd: number = this.cmd_short2rc_cmd(cmd_array[0]);
    if (rc_cmd == this.rc_cmds.CMD_RC_UNKNOWN)
      rc_cmd = this.cmd_long2rc_cmd(cmd_array[0]);
    if (rc_cmd == this.rc_cmds.CMD_RC_CFG_UNKNOWN) {
      console.log("ERROR: Unknown command " + cmd_array[0]);
      return;
    }

    // did we receive a response to a command we sent before?
    if (rc_cmd == this.rc_cmd_sent) this.rc_cmd_sent = -1;

    let cfg_file: string | string[];

    // process commands
    switch (rc_cmd) {
      case this.rc_cmds.CMD_RC_DATA_INVALID:
        // set_data_invalid_marker();
        this.set_data_invalid_marker$.next(true);
        break;

      case this.rc_cmds.CMD_RC_CFG_COUNT:
        let count = parseInt(cmd_array[1]);
        if (isNaN(count)) return; // count must be an integer value
        if ((this.cfg_parameter_count != 0) && (count != this.cfg_parameter_count)) { // did the number of cfg parameters change unexpectedly?
          // reset cfg_parameters values, request new set of cfg parameters
          console.log("WARNING: Number of cfg parameters has changed");
          this.init_parameters();

          // update_parameters();
          this.update_parameters$.next(true);

          this.send_cmd(this.rc_cmds.CMD_RC_CFG_VALUE);
        }

        // cfg_parameter_count = count;
        this.set_cfg_parameter_count(count)

        // update parameters configuration state
        this.status_set(this.cfg_parameters_states, 'CFG_PARAMETERS_STATE_COUNT');
        break;

      case this.rc_cmds.CMD_RC_CFG_VALUE:
        let name = cmd_array[1];
        let value = cmd_array[2];
        let text = cmd_array[3];
        let type = cmd_array[4];
        let allowed_values = cmd_array.slice(5).join(this.TOKEN_DELIMITER);

        // did we receive all command arguments?
        if (cmd_array.length < 6) return;

        // the number of cfg_parameters needs to be set before the first cfg parameter can be set
        if (this.cfg_parameter_count == 0) {
          // reset cfg parameters values and
          // request number of configuration parameters + full set of cfg parameters first
          this.init_parameters();
          // update_parameters();
          this.update_parameters$.next(true);

          this.send_cmd(this.rc_cmds.CMD_RC_CFG_COUNT);
          this.send_cmd(this.rc_cmds.CMD_RC_CFG_VALUE);
          return;
        }

        // do we already know a cfg parameter with the same name?
        let index = this.cfg_parameter_value.findIndex(element => element.name == name);
        let cfg_parameter_value_new = this.cfg_parameter_value_struct(name, value, text, type, allowed_values);
        if (index >= 0) {
          // yes: overwrite existing cfg parameter
          this.cfg_parameter_value[index] = cfg_parameter_value_new;
        } else {
          // no: add cfg parameter to array of known cfg parameters
          this.cfg_parameter_value[this.cfg_parameter_value.length] = cfg_parameter_value_new;
        }

        // set of parameters complete?
        if (this.cfg_parameter_count == this.cfg_parameter_value.length) {
          // update parameters configuration state
          this.status_set(this.cfg_parameters_states, 'CFG_PARAMETERS_STATE_VALUES');
        }

        // update_parameters();
        this.update_parameters$.next(true);

        break;

      case this.rc_cmds.CMD_RC_CFG_FILES:
        let files = cmd_array.splice(1).sort();
        // cfg_file_list = files;
        this.set_cfg_file_list(files)

        if (files.length == 0) {
          alert("ERROR: No configurations files");
          this.status_clear(this.controls_states, 'CONTROLS_STATE_CFG_FILES');
        } else {
          this.status_set(this.controls_states, 'CONTROLS_STATE_CFG_FILES');
        }

        // update_cfg_file_list();
        this.update_cfg_file_list$.next(true);

        break;

      case this.rc_cmds.CMD_RC_CFG_LOAD:
        cfg_file = cmd_array.splice(1, 1);
        if (cfg_file.length == 0) { alert("ERROR: Could not load configuration file") }
        // cfg_file_current = cfg_file;
        this.set_cfg_file_current(cfg_file);

        // update_cfg_file_list();
        this.update_cfg_file_list$.next(true);

        break;

      case this.rc_cmds.CMD_RC_CFG_SAVE:
        cfg_file = cmd_array.splice(1, 1);
        if (cfg_file.length == 0) { alert("ERROR: Could not save configuration file") }
        else {
          // cfg_file_current = cfg_file;
          this.set_cfg_file_current(cfg_file)
          // update_controls();
          this.update_controls$.next(true);

        }
        this.send_cmd(this.rc_cmds.CMD_RC_CFG_FILES); // request current list of cfg files
        break;

      case this.rc_cmds.CMD_RC_NODES_NAMES:
        let nodes_names_old = this.nodes_names;
        // nodes_names = cmd_array.splice(1);
        this.set_nodes_names(cmd_array.splice(1))

        if (nodes_names_old.toString() != this.nodes_names.toString()) {
          this.status_clear(this.graphics_states, 'GRAPHICS_STATE_NODES_NAMES');

          // update graphics configuration state
          if (this.nodes_names.length == 0) { alert("ERROR: Empty set of nodes names received"); return }
          else { this.status_set(this.graphics_states, 'GRAPHICS_STATE_NODES_NAMES') }
        }
        break;

      case this.rc_cmds.CMD_RC_NODES_OMODES:
        let nodes_omodes_old = this.nodes_omodes.slice(0);
        // nodes_omodes = cmd_array.splice(1);
        this.set_nodes_omodes(cmd_array.splice(1));

        if (nodes_omodes_old.toString() != this.nodes_omodes.toString()) {
          this.status_clear(this.graphics_states, 'GRAPHICS_STATE_NODES_OMODES');

          // did we reveice an empty set of nodes output modes?
          if (this.nodes_omodes.length == 0) {
            alert("ERROR: Empty set of nodes output modes received");
            this.status_clear(this.graphics_states, 'GRAPHICS_STATE_NODES_OMODES');
            return;
          }

          // do we already know the nodes names?
          if (this.nodes_names.length == 0) {
            // if not: request nodes names and nodes omodes
            this.send_cmd(this.rc_cmds.CMD_RC_NODES_NAMES);
            return;
          }

          // generate display mode list from nodes names and nodes output modes
          // display_mode_list = [];
          this.set_display_mode_list([]);

          // display_node_index_list = [];
          this.set_display_node_index_list([]);

          // console.log('display_mode_info : ' , this.display_mode_info);

          for (let i in this.display_mode_info) {
            // if display mode in nodes names
            if (this.nodes_names.includes(this.display_mode_info[i].node_name_required)) {
              let dni = this.nodes_names.findIndex(n => n == this.display_mode_info[i].node_name_required);
              if (this.nodes_omodes[dni] == 1) { // if node output enabled
                // store display mode and node index
                this.display_mode_list.push(this.display_mode_info[i].mode);
                this.display_node_index_list.push(dni);
              }
            }
          }

          // nothing found? -> Show a message
          // if (display_mode_list.length == 0) {
          // 	alert("WARNING: No suitable data received.\nCheck pipeline type and node output modes.");
          //
          // }

          // update display mode list
          // update_display_mode_list();
          this.update_display_mode_list$.next(true);

          // update graphics configuration state
          this.status_set(this.graphics_states, 'GRAPHICS_STATE_NODES_OMODES');

          this.update_graphics$.next(true)
        }
        break;

      case this.rc_cmds.CMD_RC_RUN_HALT:
        this.set_rc_state(this.rc_states.RC_STATE_HALT);

        this.status_set(this.controls_states, 'CONTROLS_STATE_STATUS');
        this.update_parameters$.next(true);
        this.update_controls$.next(true);

        break;

      case this.rc_cmds.CMD_RC_RUN_GO:
        this.set_rc_state(this.rc_states.RC_STATE_GO)

        // ctl_nruns = parseInt(cmd_array[1], 10); //TODO : not sure about this one.
        this.set_ctl_nruns(parseInt(cmd_array[1], 10));

        // trigger_id = parseInt(cmd_array[2], 10);
        this.set_trigger_id(parseInt(cmd_array[2], 10));


        this.status_set(this.controls_states, 'CONTROLS_STATE_STATUS');
        this.clear_data_invalid_marker$.next(true);
        this.update_trigger$.next(true);
        this.update_parameters$.next(true);
        this.update_controls$.next(true);
        break;

      case this.rc_cmds.CMD_RC_RUN_QUIT:
        // rc_state = rc_states.RC_STATE_QUIT;
        this.set_rc_state(this.rc_states.RC_STATE_QUIT)

        let quit_return_value = cmd_array.splice(1, 1); // TODO: in legacy_code this let was not declared before. still the code worked !
        if (quit_return_value.length == 0) { quit_return_value[0] = '0' }
        this.clear_data_invalid_marker$.next(true);
        this.init_parameters();
        this.init_controls$.next(true);
        this.update_parameters$.next(true);
        this.update_controls$.next(true);
        alert("Radar control software has been terminated.\nExit status: " + quit_return_value[0]);
        break;

      default:
        break;
    }


    // console.log('this.cfg_parameter_value : ' , this.cfg_parameter_value);

  } //process_cmd()




}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
