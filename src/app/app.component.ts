import { AfterViewInit, Component } from '@angular/core';
import { MainService } from './main.service';


declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class AppComponent implements AfterViewInit {

  constructor(private mainService: MainService) {
  }

  ngAfterViewInit(): void {
    this.main();
    this.initSubjects();
  }

  initSubjects() {
    this.mainService.init_controls$.subscribe(data => { if(data) this.init_controls() });
    this.mainService.init_graphics$.subscribe(data => { if(data) this.init_graphics() });
    this.mainService.update_graphics$.subscribe(data => { if(data) this.update_graphics() });
    this.mainService.set_data_invalid_marker$.subscribe(data => { if(data) this.set_data_invalid_marker() });
    this.mainService.update_parameters$.subscribe(data => { if(data) this.update_parameters() });
    this.mainService.update_cfg_file_list$.subscribe(data => { if(data) this.update_cfg_file_list() });
    this.mainService.update_controls$.subscribe(data => { if(data) this.update_controls() });
    this.mainService.update_display_mode_list$.subscribe(data => { if(data) this.update_display_mode_list() });
    this.mainService.clear_data_invalid_marker$.subscribe(data => { if(data) this.clear_data_invalid_marker() });
    this.mainService.update_trigger$.subscribe(data => { if(data) this.update_trigger() });
  }

  main() {
    // initialize settings
    this.init_window();
    this.update_window();

    // open websockets connection
    // ws = new_ws(get_appropriate_ws_url(""), "rc");
    // ws = new_ws('ws://192.168.1.101:4000/', "rc");
    this.mainService.set_ws(this.mainService.new_ws('ws://192.168.1.101:4000/', "rc"))
    this.mainService.ws.binaryType = 'arraybuffer';

    try {
      this.mainService.ws.onopen = () => {
        this.mainService.set_ws_state(this.mainService.ws_states.WS_STATE_CONNECTED);
        console.log('inside ws.open . this is ws_state : ' , this.mainService.ws_state)

        this.mainService.request_initial_config();
      };

      this.mainService.ws.onmessage = (msg) => {
        // console.log('we just received data from websocket'); //this is ALWAYS an ArrayBuffer

        let type_header = this.mainService.arraybuffer2type_header(msg.data.slice(0, this.mainService.TYPE_HEADER_SIZE_BYTES));

        switch (type_header.tag) {
          case this.mainService.HEADER_TAG_PIPELINE:
            console.log('we just got HEADER_TAG_PIPELINE');
            this.mainService.process_pipeline_headers(msg.data);
            break;

          case this.mainService.HEADER_TAG_DATA:
            console.log('we just got HEADER_TAG_DATA');
            this.process_graphics_data(msg.data);
            break;

          case this.mainService.HEADER_TAG_COMMAND:
            // console.log('we just got HEADER_TAG_COMMAND');
            this.mainService.process_cmd(msg.data);
            break;

          case this.mainService.HEADER_TAG_NODE:

          default:
            console.log("ws receive: ERROR | Unexpected header received: " + type_header.tag);
            break;
        }
      };

      this.mainService.ws.onclose = () =>{
        this.mainService.set_ws_state(this.mainService.ws_states.WS_STATE_DISCONNECTED)
        console.log("ws close");
      };

    }
    catch(exception) { alert("<p>Error " + exception) }

    // register event handlers
    // window resize
    $(window).bind('resize', () => { //TODO : fix this
      if ($("input").is(":focus")) {
        // save id of input field focused during resize and restore focus after update
        // to keep virtual keyboard active on mobile devices
        let id = $(":focus").attr("id");
        this.update_window();
        $("#" + id).focus();
      } else {
        this.update_window();
      }
    });
    // Runs/RUN/STOP/QUIT
    $('#ctl_nruns').change(this.nruns_handler);
    // $('#ctl_run').click(this.run_stop_handler);
    $('#ctl_quit').click(this.quit_handler);
    // Display mode
    $('#ctl_display_mode').change(this.display_mode_handler);
    // trigger source
    $('#ctl_trigger_source').change(this.trigger_handler);
    $('#ctl_trigger_id').change(this.trigger_handler);
    // cfg file load/save
    $('#ctl_cfg_file_load_name').change(this.cfg_file_load_handler);
    $('#ctl_cfg_file_save').click(this.cfg_file_save_handler);

  }


  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ config_params  §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§


  // @ts-nocheck

   NO_LIMIT = 'U';
   FLOAT_FRACTION_DIGITS = 3;

   check_parameter(parameter) {
    let i = this.mainService.cfg_parameter_value.findIndex(element => "parameter_input_" + element.name == parameter.id);
    let name = this.mainService.cfg_parameter_value[i].name;
    // let input_id = parameter.id;
    let input_id = 'parameter_input_' + name;
    let value_old = this.mainService.cfg_parameter_value[i].current_value;

    let value: number | string;
    let min;
    let max;

    switch (this.mainService.cfg_parameter_value[i].type) {
      case "L": // list: correct by design
        break;

      case "I":
        // int: auto correct values if limits exceeded
        value = parseInt($("#" + input_id).val() as string);
        if (isNaN(value)) { value = 0; $("#" + input_id).val(value) }
        min = this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[0];
        max = this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[1];
        if (min != this.NO_LIMIT && value < parseInt(min)) { $("#" + input_id).val(parseInt(min)) }
        if (max != this.NO_LIMIT && value > parseInt(max)) { $("#" + input_id).val(parseInt(max)) }

        break;

      case "F":
        // float: auto correct values if limits exceeded
        value = parseFloat($("#" + input_id).val() as string);
        if (isNaN(value)) value = 0;
        min = this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[0];
        max = this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[1];
        if (min != this.NO_LIMIT && value < parseFloat(min)) {  $("#" + input_id).val(parseFloat(min)) }
        if (max != this.NO_LIMIT && value > parseFloat(max)) {  $("#" + input_id).val(parseFloat(max)) }
        // show float values in exponential number format
        $("#" + input_id).val(parseFloat($("#" + input_id).val() as string).toExponential(this.FLOAT_FRACTION_DIGITS));
        break;

      default:
        console.log("ERROR: Unknown type " + this.mainService.cfg_parameter_value[i].type + " for cfg parameter " + name);
    }

    // request update of cfg parameter value only if parameter value changed
    value = $("#" + input_id).val() as number;
    if (value_old != value) {
      this.mainService.send_cmd(this.mainService.rc_cmds.CMD_RC_CFG_VALUE, name, value);
      // cfg_file_current = ''; // clear name of currently loaded cfg file if a parameter value has changed
      this.mainService.set_cfg_file_current(''); // clear name of currently loaded cfg file if a parameter value has changed
      $("#ctl_cfg_file_load_name").val("");
    }

    // store new parameter value
     this.mainService.cfg_parameter_value[i].current_value = $("#" + input_id).val();
  }

   update_parameters(){
    // remove old cfg parameter labels and inputs
    $("#grid_parameters_container *").remove();

    // generate full set of cfg parameter labels and inputs
    for (let i in this.mainService.cfg_parameter_value) {
      let name = this.mainService.cfg_parameter_value[i].name;
      let value = this.mainService.cfg_parameter_value[i].current_value;
      let div_id = 'parameter_' + name;
      let input_id = 'parameter_input_' + name;
      let label_text = this.mainService.cfg_parameter_value[i].text + ": ";
      $("#grid_parameters_container").append("<div id='" + div_id + "'></div>");
      $("#" + div_id).append("<label for='" + input_id + "'>" + label_text + "</label>");
      switch (this.mainService.cfg_parameter_value[i].type) {
        case "I":
          $("#" + div_id).append("<input type='number' name='" + input_id + "' id='" + input_id + "' onchange=check_parameter(this)>");
          $("#" + input_id).attr('min', parseFloat(this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[0]));
          $("#" + input_id).attr('max', parseFloat(this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[1]));
          $("#" + input_id).val(Math.floor(value));
          break;

        case "L":
          $("#" + div_id).append("<select id='" + input_id + "' onchange=check_parameter(this)></select>");
          for (let k in this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)) {
            $("#" + input_id).append("<option>" + this.mainService.cfg_parameter_value[i].allowed_values.split(this.mainService.RE_TOKEN_DELIMS)[k] + "</option>");
          }
          $("#" + input_id).val(value);
          break;

        case "F":
          $("#" + div_id).append("<input type='text' name='" + input_id + "' id='" + input_id + "' onchange=check_parameter(this)>");
          $("#" + input_id).val(parseFloat(value).toExponential(this.FLOAT_FRACTION_DIGITS));
          break;

        default:
          console.log("ERROR: Unknown type " + this.mainService.cfg_parameter_value[i].type + " for cfg parameter " + name);
      }
      switch (this.mainService.rc_state) {
        case this.mainService.rc_states.RC_STATE_QUIT:

        case this.mainService.rc_states.RC_STATE_UNDEFINED:

        case this.mainService.rc_states.RC_STATE_GO:
          $("#" + input_id).attr("disabled", "disabled");
          break;

        case this.mainService.rc_states.RC_STATE_HALT:
          $("#" + input_id).removeAttr("disabled");
          if ($('#ctl_trigger_source').val() != "Internal") {
            $('#parameter_input_timer_period_ms').attr('disabled', 'disabled');
          }
          break;
        default:
          console.log("ERROR: Unknown state: " + this.mainService.rc_state);
          break;
      }
    }
  }



  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  controls  §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

   trigger_id_timeout = 0;
   trigger_id_internal = 1;
   trigger_id_external_hw = 2;

      // default number of runs
   ctl_nruns_default = 0;

    // set required node names for display modes

   display_mode_combined = "Combined";

   display_mode;

   run_stop_handler() {
     console.log('run_stop_handler ii called')
    $("#ctl_run").attr("disabled", "disabled");

    console.log('this is rc_state : ' , this.mainService.rc_state);

    switch (this.mainService.rc_state) {
      case this.mainService.rc_states.RC_STATE_UNDEFINED:
        break;

      case this.mainService.rc_states.RC_STATE_QUIT:
        break;

      case this.mainService.rc_states.RC_STATE_HALT:
        this.mainService.send_cmd(this.mainService.rc_cmds.CMD_RC_RUN_GO, $('#ctl_nruns').val(), this.mainService.trigger_id);
        break;

      case this.mainService.rc_states.RC_STATE_GO:
        this.mainService.send_cmd(this.mainService.rc_cmds.CMD_RC_RUN_HALT);
        break;

      default:
        console.log("ERROR: Unknown rc state: " + this.mainService.rc_state);
        break;
    }
  }

   quit_handler() {
     this.mainService.send_cmd(this.mainService.rc_cmds.CMD_RC_RUN_QUIT);
    $("#ctl_quit").attr("disabled", "disabled");
  }

   nruns_handler() {
     this.mainService.ctl_nruns = $('#ctl_nruns').val();
  }

   cfg_file_load_handler() {
     this.mainService.send_cmd(this.mainService.rc_cmds.CMD_RC_CFG_LOAD, $("#ctl_cfg_file_load_name").val());
    // clear cfg file name; name will be set in response
    $("#ctl_cfg_file_load_name").val("");
  }

   cfg_file_save_handler() {
    if ($('#ctl_cfg_file_save_name').val() != '') {
      // ignore path, use filename only

      let temp:any = $('#ctl_cfg_file_save_name').val();
      let path_elements = temp.split(/[\\\/]+/);
      // let path_elements = $('#ctl_cfg_file_save_name').val().split(/[\\\/]+/);


      this.mainService.send_cmd(this.mainService.rc_cmds.CMD_RC_CFG_SAVE, path_elements[path_elements.length - 1]);
      $("#ctl_cfg_file_save_name").val(''); // clear cfg file name
    }
  }

   trigger_handler() {
    // default settings
    $('#parameter_input_timer_period_ms').attr('disabled', 'disabled');
    $('#ctl_trigger_id').attr('disabled', 'disabled');
    $('#ctl_trigger_id').attr('min', this.trigger_id_external_hw + 1);
    $('#ctl_trigger_id').val(this.trigger_id_external_hw + 1);

    switch ($('#ctl_trigger_source').val()) {
      case "Internal":
        this.mainService.trigger_id = this.trigger_id_internal;
        $('#parameter_input_timer_period_ms').removeAttr('disabled');
        break;

      case "External (HW)":
        this.mainService.trigger_id = this.trigger_id_external_hw;
        break;

      case "External (SW)":
        this.mainService.trigger_id = $('#ctl_trigger_id').val();
        $('#ctl_trigger_id').removeAttr('disabled');
        $('#ctl_trigger_id').attr('min', this.trigger_id_external_hw + 1);
        break;

      default: ;
    }
  }

   display_mode_handler() {
    this.display_mode = $("#ctl_display_mode").val();

    if (this.display_mode == this.display_mode_combined) {
      this.mainService.node_index_required = this.mainService.display_node_index_list[0]; // select first node in combined display mode
    }
    else {
      this.mainService.node_index_required = this.mainService
        .display_node_index_list[this.mainService.display_mode_list.findIndex(e => e == this.display_mode)];
      // else pick suitable node index from node index list
    }

    this.update_canvas_overlays();
  }

    // update trigger controls
   update_trigger() {
    $('#ctl_trigger_source').removeAttr('disabled');
    $('#ctl_trigger_id').attr('disabled', 'disabled');

    switch (this.mainService.trigger_id) {
      case this.trigger_id_timeout:
        alert("Error: Wrong trigger ID (" + this.mainService.trigger_id + ")");
        break;

      case this.trigger_id_internal:
        $('#ctl_trigger_source').val("Internal");
        break;

      case this.trigger_id_external_hw:
        $('#ctl_trigger_source').val("External (HW)");
        break;

      default:
        // external SW
        $('#ctl_trigger_source').val("External (SW)");
        $('#ctl_trigger_id').removeAttr('disabled');
        $('#ctl_trigger_id').val(this.mainService.trigger_id);
    }
  }

    // update config files list
   update_cfg_file_list() {
    $("#ctl_cfg_file_load_name option").remove();  // remove old cfg files

    for (let index in this.mainService.cfg_file_list) {  // append cfg files to listbox
      $("#ctl_cfg_file_load_name").append("<option>" + this.mainService.cfg_file_list[index] + "</option>");
    }

    $("#ctl_cfg_file_load_name").val(this.mainService.cfg_file_current);  // set previously stored cfg file
  }

    // update display mode list
   update_display_mode_list() {
    $("#ctl_display_mode option").remove();  // remove old display modes
    for (let index in this.mainService.display_mode_list) { // append display modes to listbox
      $("#ctl_display_mode").append("<option>" + this.mainService.display_mode_list[index] + "</option>");

      // select display mode if it fits the current pipeline
      if (this.mainService.cfg_parameter_value.find(n => n.name == "pipeline_type").current_value == this.mainService.display_mode_info
        .find(n => n.mode == this.mainService.display_mode_list[index]).match_to_pipeline) {
        $("#ctl_display_mode").val(this.mainService.display_mode_list[index]);
        this.display_mode = this.mainService.display_mode_list[index];
        this.mainService.node_index_required = this.mainService.display_node_index_list[index];
      }
    }

    // add "Combined" option, if more than one display mode available
    if (this.mainService.display_mode_list.length > 1) {
      $("#ctl_display_mode").append("<option>" + this.display_mode_combined + "</option>");
    }
  }

   update_controls() {
    switch (this.mainService.rc_state) {
      case this.mainService.rc_states.RC_STATE_UNDEFINED:

      case this.mainService.rc_states.RC_STATE_QUIT:
        $("#ctl_nruns").attr("disabled", "disabled");
        $("#ctl_run").attr("disabled", "disabled");
        $("#ctl_run").attr("value", "Start");;
        $("#ctl_cfg_file_load_name").attr("disabled", "disabled");
        $("#ctl_cfg_file_load").attr("disabled", "disabled");
        $("#ctl_cfg_file_save_name").attr("disabled", "disabled");
        $("#ctl_cfg_file_save").attr("disabled", "disabled");
        $('#ctl_trigger_source').attr('disabled', 'disabled');
        $('#ctl_trigger_id').attr('disabled', 'disabled');
        $('#ctl_display_mode').attr('disabled', 'disabled');
        break;

      case this.mainService.rc_states.RC_STATE_HALT:
        $("#ctl_nruns").removeAttr("disabled");
        $("#ctl_run").removeAttr("disabled");
        $("#ctl_run").attr("value", "Start");;
        $("#ctl_cfg_file_load_name").removeAttr("disabled");
        $("#ctl_cfg_file_load").removeAttr("disabled");
        $("#ctl_cfg_file_save_name").removeAttr("disabled");
        $("#ctl_cfg_file_save").removeAttr("disabled");
        $('#ctl_trigger_source').removeAttr('disabled');
        if ($('#ctl_trigger_source').val() == "External (SW)") {
          $('#ctl_trigger_id').removeAttr('disabled');
        }
        $('#ctl_display_mode').removeAttr('disabled');
        break;

      case this.mainService.rc_states.RC_STATE_GO:
        $("#ctl_nruns").attr("disabled", "disabled");
        $("#ctl_run").removeAttr("disabled");
        $("#ctl_run").attr("value", "Stop");
        $("#ctl_cfg_file_load_name").attr("disabled", "disabled");
        $("#ctl_cfg_file_load").attr("disabled", "disabled");
        $("#ctl_cfg_file_save_name").removeAttr("disabled");
        $("#ctl_cfg_file_save").removeAttr("disabled");
        $('#ctl_trigger_source').attr('disabled', 'disabled');
        $('#ctl_trigger_id').attr('disabled', 'disabled');
        $('#ctl_display_mode').removeAttr('disabled');
        break;

      default:
        console.log("ERROR: Unknown rc state: " + this.mainService.rc_state);
        break;
    }
  }

   init_controls() {
     this.mainService.cfg_file_current = '';
     this.mainService.cfg_file_list = [];
     $('#ctl_cfg_file_load_name').val(this.mainService.cfg_file_current);
     $('#ctl_nruns').val(this.ctl_nruns_default);
     this.mainService.rc_state = this.mainService.rc_states.RC_STATE_UNDEFINED;
     this.mainService.set_rc_cmd_sent(-1)
     this.mainService.trigger_id = this.trigger_id_internal;
     $('#ctl_trigger_source').val('Internal');
     $('#ctl_trigger_id').attr('min', this.trigger_id_external_hw + 1);
     $('#ctl_trigger_id').val(this.trigger_id_external_hw + 1);

     this.mainService.display_mode_list = [];
     this.mainService.display_node_index_list = [];
     this.display_mode = '';
     $('#ctl_display_mode').val(this.display_mode);
     this.mainService.node_index_required = -1;

     this.mainService.status_clearall(this.mainService.controls_states);
  }


  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  graphics  §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
  //§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§

   nodes_headers;

    // default values

    // scales
   SCALE_FONT = "sans-serif";
   SCALE_FONTSIZE = 10;
   SCALE_FILLSTYLE = "black";
   SCALE_TICKLENGTH = 10;
   SCALE_TICK2TEXT_DISTANCE = 0.2 * this.SCALE_FONTSIZE;
   SCALE_DECIMAL_PLACES = 1;
   SCALE_DIVS_BETWEEN_LONG_TICKS = 5;

    // resolution
   RESOLUTION_DECIMAL_PLACES = 3;

    // colorbar
   COLORBAR_SLIDER_DEFAULT_VALUES = [
    255 * 0.40,
    255 * 0.50,
    255 * 0.60,
    255 * 0.70,
    255 * 0.80
  ];

   COLORBAR_SCALE_MIN = 0;
   COLORBAR_SCALE_MAX = 140;
   COLORBAR_SCALE_DECIMAL_PLACES = 0;

   // CFAR colors
   // color for areas without target
   CFAR_NO_TARGET_COLOR = 0xFFFF0000;

   // highlight color for CFAR targets in combined display mode
   CFAR_HIGHLIGHT_COLOR = 0xFF0000FF;

   // transparency for pixels not on a CFAR target in combined display mode
   CFAR_TRANSPARENT_COLOR = 0x00000000;

   // image position / size
   image_data_offset_x;
   image_data_size_x;
   image_data_offset_y;
   image_data_size_y;


   // canvas data
   image_scale_canvas;
   image_scale_canvas_ctx;

   colorbar_scale_canvas;
   colorbar_scale_canvas_ctx;

   image_rdmap_canvas;
   image_rdmap_canvas_ctx;
   imgdata_rdmap_canvas;
   imgdata_rdmap_canvas_ctx;
   imgdata_rdmap;

   image_cfar_canvas;
   image_cfar_canvas_ctx;
   imgdata_cfar_canvas;
   imgdata_cfar_canvas_ctx;
   imgdata_cfar;

   image_cfar_highlight_canvas;
   image_cfar_highlight_canvas_ctx;
   imgdata_cfar_highlight_canvas;
   imgdata_cfar_highlight_canvas_ctx;
   imgdata_cfar_highlight;

   scaled_rgbatable;


   // return the width of a text in number of pixels
   getWidthOfText(txt, fontname, fontsize) {
    // Create a dummy canvas (render invisible with css)
    let c = document.createElement('canvas');
    // Get the context of the dummy canvas
    let ctx = c.getContext('2d');
    // Set the context.font to the font that you are using
    ctx.font = fontsize + 'px' + fontname;
    // Measure the string
    let length = ctx.measureText(txt).width;
    return length;
  }

   set_data_invalid_marker() {
    // $('#grid_graphics_container').css('border-color', 'red');
    document.getElementById('grid_graphics_container').style.borderColor = 'red';
  }

   clear_data_invalid_marker() {
    // $('#grid_graphics_container').css('border-color', '');
    document.getElementById('grid_graphics_container').style.borderColor = '';
  }

   draw_scale(id_canvas, scale_pos_x, scale_pos_y, scale_size, ticklength, decimal_places, orientation,
              divs_between_long_ticks, fillstyle, font, fontsize, world_start, world_stop, bins, legend) {
    let element: any = document.getElementById(id_canvas);
    if (element.getContext) {
      let ctx = element.getContext('2d');

      ctx.fillStyle = fillstyle;
      ctx.font = fontsize + "px " + font;
      ctx.strokeStyle = fillstyle;

      let size_per_bin = scale_size / bins;
      let image2world_ratio = size_per_bin * (bins - 1) / (world_stop - world_start);
      let max_scale_value_scale_size = Math.max(this.getWidthOfText(world_start.toFixed(this.SCALE_DECIMAL_PLACES).toString(),
        this.SCALE_FONT, this.SCALE_FONTSIZE), this.getWidthOfText(world_stop.toFixed(this.SCALE_DECIMAL_PLACES).toString(), this.SCALE_FONT, this.SCALE_FONTSIZE));

      let scale_start_x;
      let scale_start_y;
      let tick_scale_pos_x_long;
      let tick_scale_pos_x_short;
      let tick_scale_pos_y_long;
      let tick_scale_pos_y_short;
      let text_scale_pos_x;
      let text_scale_pos_y;
      let axis_line_end_x;
      let axis_line_end_y;
      let legend_x;
      let legend_y;
      let max_divs;

      // calculate default values
      switch (orientation) {
        case "horizontal":
          scale_start_x = scale_pos_x + size_per_bin / 2;
          scale_start_y = scale_pos_y;
          tick_scale_pos_x_long = 0;
          tick_scale_pos_x_short = 0;
          tick_scale_pos_y_long = ticklength;
          tick_scale_pos_y_short = ticklength / 2;
          text_scale_pos_x = 0;
          text_scale_pos_y = tick_scale_pos_y_long + this.SCALE_TICK2TEXT_DISTANCE ;
          axis_line_end_x = scale_pos_x + scale_size;
          axis_line_end_y = scale_pos_y;
          legend_x = scale_pos_x + scale_size / 2;
          legend_y = scale_pos_y + tick_scale_pos_y_long + 2 * this.SCALE_FONTSIZE;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          max_divs = Math.floor(size_per_bin * (bins - 1) / max_scale_value_scale_size);
          break;

        case "vertical_right":
          scale_start_x = scale_pos_x;
          scale_start_y = scale_pos_y - size_per_bin / 2;
          tick_scale_pos_x_long = ticklength;
          tick_scale_pos_x_short = ticklength / 2;
          tick_scale_pos_y_long = 0;
          tick_scale_pos_y_short = 0;
          text_scale_pos_x = tick_scale_pos_x_long + this.SCALE_TICK2TEXT_DISTANCE;
          text_scale_pos_y = 0;
          axis_line_end_x = scale_pos_x;
          axis_line_end_y = scale_pos_y + scale_size;
          legend_x = scale_pos_x + tick_scale_pos_x_long + max_scale_value_scale_size;
          legend_y = scale_pos_y + scale_size / 2;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          max_divs = size_per_bin * (bins - 1) / fontsize;
          break;

        case "vertical_left":
          scale_start_x = scale_pos_x;
          scale_start_y = scale_pos_y - size_per_bin / 2;
          tick_scale_pos_x_long = -ticklength;
          tick_scale_pos_x_short = -ticklength / 2;
          tick_scale_pos_y_long = 0;
          tick_scale_pos_y_short = 0;
          text_scale_pos_x = tick_scale_pos_x_long - this.SCALE_TICK2TEXT_DISTANCE;
          text_scale_pos_y = 0;
          axis_line_end_x = scale_pos_x;
          axis_line_end_y = scale_pos_y + scale_size;
          legend_x = scale_pos_x + text_scale_pos_x - max_scale_value_scale_size - this.SCALE_FONTSIZE;
          legend_y = scale_pos_y + scale_size / 2;
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          max_divs = size_per_bin * (bins - 1) / fontsize;
          break;
      }

      // calculate step size per division for long/short ticklines, snapped to next power of 10
      let stepsize_per_div = (world_stop - world_start) / max_divs;
      let stepsize_per_div_log = Math.ceil(Math.log10(stepsize_per_div));
      let stepsize_per_div_snap_long = Math.pow(10, stepsize_per_div_log);
      let stepsize_per_div_snap_short = stepsize_per_div_snap_long / divs_between_long_ticks;

      // step along axis, draw tick lines and values
      let current_value = Math.ceil(world_start / stepsize_per_div_snap_short) * stepsize_per_div_snap_short;
      while (current_value <= world_stop) {
        // calculate world_start position for tick line

        let pos_x;
        let pos_y;

        switch (orientation) {
          case "horizontal":
            pos_x = Math.round(scale_start_x + (current_value - world_start) * image2world_ratio);
            pos_y = scale_start_y;
            break;

          case "vertical_right":
            pos_x = scale_start_x;
            pos_y = Math.round(scale_start_y + scale_size - (current_value - world_start) * image2world_ratio);
            break;

          case "vertical_left":
            pos_x = scale_start_x;
            pos_y = Math.round(scale_start_y + scale_size - (current_value - world_start) * image2world_ratio);
            break;
        }

        // draw tick lines + value text
        if (pos_x >= scale_pos_x && pos_y >= scale_pos_y) {
          // long tick line at current position?
          ctx.beginPath();
          ctx.moveTo(pos_x, pos_y);
          let tmp_long = current_value / stepsize_per_div_snap_long;
          if (Math.abs((tmp_long) - Math.round(tmp_long)) < 0.01) {
            // yes: long tickline + value
            ctx.lineTo(pos_x + tick_scale_pos_x_long, pos_y + tick_scale_pos_y_long);
            ctx.fillText(current_value.toFixed(decimal_places), pos_x + text_scale_pos_x, pos_y + text_scale_pos_y);
          }
          else {
            // no: short tickline
            ctx.lineTo(pos_x + tick_scale_pos_x_short, pos_y + tick_scale_pos_y_short);
          }
          ctx.stroke();
        }

        // increment current value
        current_value = Math.round((current_value + stepsize_per_div_snap_short) / stepsize_per_div_snap_short) * stepsize_per_div_snap_short;
      }

      // draw axis
      ctx.beginPath();
      ctx.moveTo(scale_pos_x, scale_pos_y);
      ctx.lineTo(axis_line_end_x, axis_line_end_y);
      ctx.stroke();


      // draw legend
      if (orientation == "vertical_right" || orientation == "vertical_left") {
        ctx.save();
        ctx.translate(0, 0);
        ctx.rotate(-Math.PI/2);
        ctx.textAlign = "center";
        ctx.fillText(legend, -legend_y, legend_x);
        ctx.restore();
      } else {
        ctx.fillText(legend, legend_x, legend_y);
      }
    }
  }

   // draw rdmap scales
   draw_scales_rdmap() {
    // clear image scale canvas
    this.image_scale_canvas_ctx.clearRect(0, 0, this.image_scale_canvas.width, this.image_scale_canvas.height);

    // x axis
     this.draw_scale("image_scale_canvas", this.image_data_offset_x, this.image_data_offset_y + this.image_data_size_y, this.image_data_size_x,
       this.SCALE_TICKLENGTH, this.SCALE_DECIMAL_PLACES, "horizontal", this.SCALE_DIVS_BETWEEN_LONG_TICKS, this.SCALE_FILLSTYLE,
       this.SCALE_FONT, this.SCALE_FONTSIZE, this.mainService.scale_world_start_x * 100,
       (this.mainService.scale_world_start_x + this.mainService.scale_world_range_x) * 100,
       this.mainService.data_image_range_x, this.mainService.scale_legend_x + ' / cm  (' + (this.mainService.res_x * 100)
       .toFixed(this.RESOLUTION_DECIMAL_PLACES) + ' cm / bin)');

     // y axis
     this.draw_scale("image_scale_canvas", this.image_data_offset_x, this.image_data_offset_y, this.image_data_size_y, this.SCALE_TICKLENGTH,
       this.SCALE_DECIMAL_PLACES, "vertical_left", this.SCALE_DIVS_BETWEEN_LONG_TICKS, this.SCALE_FILLSTYLE, this.SCALE_FONT,
       this.SCALE_FONTSIZE, this.mainService.scale_world_start_y, this.mainService.scale_world_start_y + this.mainService.scale_world_range_y,
       this.mainService.data_image_range_y,
       this.mainService.scale_legend_y + ' / m/s  (' + this.mainService.res_y.toFixed(this.RESOLUTION_DECIMAL_PLACES) + ' m/s / bin)');

    // clear colorbar scale canvas
     this.colorbar_scale_canvas_ctx.clearRect(0 , 0 , this.colorbar_scale_canvas.width, this.colorbar_scale_canvas.height);

    // colorbar
     this.draw_scale("colorbar_scale_canvas", 0, this.image_data_offset_y, this.image_data_size_y,
       this.SCALE_TICKLENGTH, this.COLORBAR_SCALE_DECIMAL_PLACES, "vertical_right",
       this.SCALE_DIVS_BETWEEN_LONG_TICKS, this.SCALE_FILLSTYLE, this.SCALE_FONT, this.SCALE_FONTSIZE,
       this.COLORBAR_SCALE_MIN, this.COLORBAR_SCALE_MAX, 100000, "");
  }

   // adjust colorbar according to current window dimensions
   adjust_colorbar() {
    let id_elements = ["#colorbar_blue", "#colorbar_cyan2blue", "#colorbar_green2cyan", "#colorbar_yellow2green",
                        "#colorbar_red2yellow", "#colorbar_red"];
    let id_slider = "#colorbar_slider"

    // read values from slider, sort values and write them back to slider
    let values = $(id_slider).slider("option", "values").sort((a,b) => { return a - b });
    $(id_slider).slider({"values": values});

    // adjust heights of colorbar ranges according to slider values
    for (let i = 0; i <= values.length; i++) {
      if (i == 0) {
        $(id_elements[i]).css("height", String(values[i] * 100/255)+"%");
      } else if (i == values.length) {
        $(id_elements[i]).css("height", String((255 - values[i-1]) * 100/255)+"%");
      } else {
        $(id_elements[i]).css("height", String((values[i] - values[i-1]) * 100/255)+"%");
      }
    }

    // RGBA table, maps uint8 values to RGBA values
    // RGBA values are stored as ABGR
    let cb_blue_level = parseInt(values[0]);
    let cb_cyan_level = parseInt(values[1]);
    let cb_green_level = parseInt(values[2]);
    let cb_yellow_level = parseInt(values[3]);
    let cb_red_level = parseInt(values[4]);


    let rgbatable = new Uint32Array(256);
    for (let i = 0;i <= cb_blue_level;i++) {
      rgbatable[i] = 0xFFFF0000;
    }
    for (let i = cb_blue_level;i <= cb_cyan_level;i++) {
      rgbatable[i] = 0xFFFF0000 + ((255*(i-cb_blue_level)/(cb_cyan_level-cb_blue_level)) << 8);
    }
    for (let i = cb_cyan_level;i <= cb_green_level;i++) {
      rgbatable[i] = 0xFFFFFF00 - ((255*(i-cb_cyan_level)/(cb_green_level-cb_cyan_level)) << 16);
    }
    for (let i = cb_green_level;i <= cb_yellow_level;i++) {
      rgbatable[i] = 0xFF00FF00 + (255*(i-cb_green_level)/(cb_yellow_level-cb_green_level));
    }
    for (let i = cb_yellow_level;i <= cb_red_level;i++) {
      rgbatable[i] = 0xFF00FFFF - ((255*(i-cb_yellow_level)/(cb_red_level-cb_yellow_level)) << 8);
    }
    for (let i = cb_red_level;i <= 255;i++) {
      rgbatable[i] = 0xFF0000FF;
    }

    // scaled RGBA table, maps Uint8 radar data to colormap
    this.scaled_rgbatable = new Uint32Array(256);

    let scale = 255/(this.COLORBAR_SCALE_MAX - this.COLORBAR_SCALE_MIN);
    let offset = -this.COLORBAR_SCALE_MIN;

    // mapping for unsigned input data
    for (let i = 0; i < 256; i++) {
      if (i < this.COLORBAR_SCALE_MIN) { this.scaled_rgbatable[i] = 0xFF800000 }
      else if (i > this.COLORBAR_SCALE_MAX) { this.scaled_rgbatable[i] = 0xFF000080 }
      else { this.scaled_rgbatable[i] = rgbatable[(scale * (i + offset)) | 0] }
    }

  }


   // adjust graphics according to current window dimensions
   adjust_graphics () {

    /////////////////////////////////////////////////
    // adjust widths

    // auto adjust first
    $("#grid_graphics_image").css("width", "auto");
    $("#image_scale_canvas").css("width", "auto");
    $("#image_scale_canvas").attr("width", "auto");
    $("#grid_graphics_colorbar_scale").css("width", "auto");
    $("#colorbar_scale_canvas").css("width", "auto");
    $("#colorbar_scale_canvas").attr("width", "auto");

    // read current widths inside graphics box
    let graphics_width = parseInt($("#grid_graphics").css("width"));
    let spacer_width = parseInt($("#grid_graphics_spacer").css("width"));
    let colorbar_slider_width = parseInt($("#grid_graphics_colorbar_slider").css("width"));
    let colorbar_width = parseInt($("#grid_graphics_colorbar").css("width"));

    // colorbar scale
    let colorbar_scale_width = Math.max(this.getWidthOfText(this.COLORBAR_SCALE_MIN.toFixed(this.COLORBAR_SCALE_DECIMAL_PLACES).toString(),
      this.SCALE_FONT, this.SCALE_FONTSIZE),
      this.getWidthOfText(this.COLORBAR_SCALE_MAX.toFixed(this.COLORBAR_SCALE_DECIMAL_PLACES).toString(), this.SCALE_FONT, this.SCALE_FONTSIZE))
      + this.SCALE_TICKLENGTH + this.SCALE_TICK2TEXT_DISTANCE;

    $("#grid_graphics_colorbar_scale").css("width", colorbar_scale_width + "px");
    $("#colorbar_scale_canvas").css("width", colorbar_scale_width + "px");
    $("#colorbar_scale_canvas").attr("width", colorbar_scale_width);

    // image
    let max_scale_y_value_size = Math.round(Math.max(this.getWidthOfText(this.mainService.scale_world_start_y.toFixed(this.SCALE_DECIMAL_PLACES).toString(), this.SCALE_FONT, this.SCALE_FONTSIZE),
      this.getWidthOfText((this.mainService.scale_world_start_y + this.mainService.scale_world_range_y)
        .toFixed(this.SCALE_DECIMAL_PLACES).toString(), this.SCALE_FONT, this.SCALE_FONTSIZE)));

    let image_scale_width = graphics_width - (spacer_width + colorbar_slider_width + colorbar_width + colorbar_scale_width);
     this.image_data_offset_x = this.SCALE_TICKLENGTH + max_scale_y_value_size + this.SCALE_TICK2TEXT_DISTANCE + 2 * this.SCALE_FONTSIZE;
     this.image_data_size_x = image_scale_width - this.image_data_offset_x - this.SCALE_FONTSIZE;
    $("#grid_graphics_image").css("width", image_scale_width + "px");
    $("#image_scale_canvas").css("width", image_scale_width + "px");
    $("#image_scale_canvas").attr("width", image_scale_width);
    $("#image_rdmap_canvas").css("width", this.image_data_size_x + "px");
    $("#image_cfar_canvas").css("width", this.image_data_size_x + "px");
    $("#image_cfar_highlight_canvas").css("width", this.image_data_size_x + "px");

    /////////////////////////////////////////////////
    // adjust heights

    // read current height of frames
    let graphics_height = parseInt($("#grid_graphics_container.box").css("height"), 10);

     this.image_data_offset_y = this.SCALE_FONTSIZE / 2;
     this.image_data_size_y = graphics_height -
       (this.image_data_offset_y + this.SCALE_TICKLENGTH + this.SCALE_TICK2TEXT_DISTANCE + 3 * this.SCALE_FONTSIZE);

    // colorbar
    $("#grid_graphics_colorbar_slider").css("height", this.image_data_size_y);
    $("#grid_graphics_colorbar").css("height", this.image_data_size_y);
    $("#colorbar_scale_canvas").css("height", graphics_height + "px");
    $("#colorbar_scale_canvas").attr("height", graphics_height);

    // image
    $("#image_scale_canvas").css("height", graphics_height + "px");
    $("#image_scale_canvas").attr("height", graphics_height);
    $("#image_rdmap_canvas").css("height", this.image_data_size_y + "px");
    $("#image_cfar_canvas").css("height", this.image_data_size_y + "px");
    $("#image_cfar_highlight_canvas").css("height", this.image_data_size_y + "px");

    /////////////////////////////////////////////////
    // adjust offsets

    // colorbar
    $("#grid_graphics_colorbar_slider").css("padding-top", this.image_data_offset_y);
    $("#grid_graphics_colorbar").css("padding-top", this.image_data_offset_y);

    // image
    $("#image_rdmap_canvas").css("top", this.image_data_offset_y - 1 + "px");
    $("#image_rdmap_canvas").css("left", this.image_data_offset_x - 1 + "px");
    $("#image_cfar_canvas").css("top", this.image_data_offset_y - 1 + "px");
    $("#image_cfar_canvas").css("left", this.image_data_offset_x - 1 + "px");
    $("#image_cfar_highlight_canvas").css("top", this.image_data_offset_y - 1 + "px");
    $("#image_cfar_highlight_canvas").css("left", this.image_data_offset_x - 1 + "px");

     this.adjust_colorbar();
  }


   process_graphics_data(data_buffer) {
    // cfg_parameters / controls / graphics must be fully configured before
    if ((!this.mainService.status_iscomplete(this.mainService.cfg_parameters_states)) ||
      (!this.mainService.status_iscomplete(this.mainService.controls_states)) ||
      (!this.mainService.status_iscomplete(this.mainService.graphics_states))) {
      // reset cfg_parameters/controls/graphics, request initial config
      console.log("WARNING: Pipeline header received, but basic configuration is not complete");
      this.mainService.init_parameters();
      this.init_controls();
      this.init_graphics();
      this.mainService.request_initial_config();
      return;
    }

    // do nothing if node index of data received is not included in the list of node indices to be displayed
    let node_index = this.mainService.arraybuffer2type_header(data_buffer.slice(0, this.mainService.TYPE_HEADER_SIZE_BYTES)).value;
    if (!this.mainService.display_node_index_list.includes(node_index)) return;

    // check incoming datatype
    if (this.mainService.data_datatype != 'U') {
      alert("ERROR: Wrong datatype (" + this.mainService.data_datatype + ") received");
      return;
    }


    let data;
    let rgba_buf32;
    let rgba_buf8;

    // map received data to RGBA values
    // use the highest byte only
    switch (this.nodes_headers[node_index].bitwidth) {
      case 8:
        data = new Uint8Array(data_buffer.slice(this.mainService.TYPE_HEADER_SIZE_BYTES));
        rgba_buf32 = Uint32Array.from(data).map(e => this.scaled_rgbatable[e]);
        break;

      case 16:
        data = new Uint16Array(data_buffer.slice(this.mainService.TYPE_HEADER_SIZE_BYTES));
        rgba_buf32 = Uint32Array.from(data).map(e => this.scaled_rgbatable[e >> 8]);
        break;

      case 32:
        data = new Uint32Array(data_buffer.slice(this.mainService.TYPE_HEADER_SIZE_BYTES));
        rgba_buf32 = data.map(e => this.scaled_rgbatable[e >> 24]);
        break;

      default:
        alert("ERROR: Wrong bitwidth (" + this.nodes_headers[node_index].data_bitwidth + ") received");
        return;
    }

    rgba_buf8 = new Uint8Array(rgba_buf32.buffer);

    // copy RGBA data to canvas
    let display_mode_received = this.mainService.display_mode_list[this.mainService.display_node_index_list.findIndex(e => e == node_index)];

    switch (display_mode_received) {
      case 'R/D Map':
        this.imgdata_rdmap.data.set(rgba_buf8);
        this.image_rdmap_canvas_ctx.putImageData(this.imgdata_rdmap, 0, 0, this.mainService.data_image_start_x,
          this.mainService.data_image_start_y, this.mainService.data_image_range_x, this.mainService.data_image_range_y);
        break;

      case 'CFAR':
        this.imgdata_cfar.data.set(rgba_buf8);
        this.image_cfar_canvas_ctx.putImageData(this.imgdata_cfar, 0, 0, this.mainService.data_image_start_x,
          this.mainService.data_image_start_y, this.mainService.data_image_range_x, this.mainService.data_image_range_y);

        rgba_buf8 = new Uint8Array(rgba_buf32.map(x => x != this.CFAR_NO_TARGET_COLOR ? this.CFAR_HIGHLIGHT_COLOR : this.CFAR_TRANSPARENT_COLOR).buffer);
        this.imgdata_cfar_highlight.data.set(rgba_buf8);

        this.image_cfar_highlight_canvas_ctx.putImageData(this.imgdata_cfar_highlight, 0, 0, this.mainService.data_image_start_x,
          this.mainService.data_image_start_y, this.mainService.data_image_range_x, this.mainService.data_image_range_y);
        break;

      default:
        console.log("ERROR: Unknown display mode (" + this.display_mode + ")");
        break;
    }

     this.clear_data_invalid_marker();
  }


   // redraw canvas overlays
   update_canvas_overlays() {
    if(this.mainService.status_iscomplete(this.mainService.graphics_states)) {
      switch (this.display_mode) {
        case 'R/D Map':
          $("#image_rdmap_canvas").css("z-index", "3");
          $("#image_cfar_canvas").css("z-index", "2");
          $("#image_cfar_highlight_canvas").css("z-index", "2");
          break;

        case 'CFAR':
          $("#image_cfar_canvas").css("z-index", "3");
          $("#image_rdmap_canvas").css("z-index", "2");
          $("#image_cfar_highlight_canvas").css("z-index", "2");
          break;

        case 'Combined':
          $("#image_cfar_highlight_canvas").css("z-index", "3");
          $("#image_rdmap_canvas").css("z-index", "2");
          $("#image_cfar_canvas").css("z-index", "1");
          break;

        default:
          break;
      }
    }
  }


    // redraw graphics according to current window dimemsions and scale settings
   update_graphics() {
    if(this.mainService.status_iscomplete(this.mainService.graphics_states)) {
      this.draw_scales_rdmap();

      this.image_rdmap_canvas.width = this.mainService.data_image_range_x;
      this.image_rdmap_canvas.height = this.mainService.data_image_range_y;
      this.imgdata_rdmap = this.image_rdmap_canvas_ctx.getImageData(0, 0, this.mainService.data_image_size_x, this.mainService.data_image_size_y);
      $("#image_rdmap_canvas").css("border", "solid 1px black");

      this.image_cfar_canvas.width = this.mainService.data_image_size_x;
      this.image_cfar_canvas.height = this.mainService.data_image_size_y;
      this.imgdata_cfar = this.image_cfar_canvas_ctx.getImageData(0, 0, this.mainService.data_image_size_x, this.mainService.data_image_size_y);
      $("#image_cfar_canvas").css("border", "solid 1px black");

      this.image_cfar_highlight_canvas.width = this.mainService.data_image_size_x;
      this.image_cfar_highlight_canvas.height = this.mainService.data_image_size_y;
      this.imgdata_cfar_highlight = this.image_cfar_highlight_canvas_ctx.getImageData(0, 0, this.mainService.data_image_size_x, this.mainService.data_image_size_y);
      $("#image_cfar_highlight_canvas").css("border", "solid 1px black");

      this.update_canvas_overlays();
    }
  }


    // initialize graphics settings
   init_graphics() {
     this.mainService.status_clearall(this.mainService.graphics_states);

     this.mainService.nodes_names = [];
     this.mainService.nodes_omodes = [];
     this.nodes_headers = [];

     this.mainService.scale_legend_x = '';
     this.mainService.scale_legend_y = '';
     this.mainService.data_datatype = '';
     this.mainService.data_bitwidth = 0;
     this.mainService.data_image_size_x = 0;
     this.mainService.data_image_size_y = 0;
     this.mainService.data_image_start_x = 0;
     this.mainService.data_image_start_y = 0;
     this.mainService.data_image_range_x = 0;
     this.mainService.data_image_range_y = 0;
     this.mainService.scale_world_start_x = 0;
     this.mainService.scale_world_start_y = 0;
     this.mainService.scale_world_range_x = 0;
     this.mainService.scale_world_range_y = 0;
     this.mainService.res_x = 0;
     this.mainService.res_y = 0;

    $("#colorbar_slider").slider({
      orientation: "vertical",
      values: this.COLORBAR_SLIDER_DEFAULT_VALUES,
      min: 0,
      max: 255,
      slide: function() {
        this.mainService.adjust_colorbar();
      }
    });

     this.image_scale_canvas = document.getElementById('image_scale_canvas');
     this.image_scale_canvas_ctx = this.image_scale_canvas.getContext("2d");

     this.colorbar_scale_canvas = document.getElementById('colorbar_scale_canvas');
     this.colorbar_scale_canvas_ctx = this.colorbar_scale_canvas.getContext("2d");

     this.image_rdmap_canvas = document.getElementById('image_rdmap_canvas');
     this.image_rdmap_canvas_ctx = this.image_rdmap_canvas.getContext('2d');
     this.imgdata_rdmap_canvas = document.createElement('canvas');

     this.image_cfar_canvas = document.getElementById('image_cfar_canvas');
     this.image_cfar_canvas_ctx = this.image_cfar_canvas.getContext('2d');
     this.imgdata_cfar_canvas = document.createElement('canvas');

     this.image_cfar_highlight_canvas = document.getElementById('image_cfar_highlight_canvas');
     this.image_cfar_highlight_canvas_ctx = this.image_cfar_highlight_canvas.getContext('2d');
     this.imgdata_cfar_highlight_canvas = document.createElement('canvas');
  }



  init_window() {
    this.init_graphics();
    this.init_controls();
    this.mainService.init_parameters();
  }


  update_window() {
    this.adjust_graphics();
    this.update_graphics();
    this.update_controls();
    this.update_parameters();
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


