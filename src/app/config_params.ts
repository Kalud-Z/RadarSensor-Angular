///////////////////////////////////////
// config parameters and files
///////////////////////////////////////

import { states_struct, status_clearall, struct } from './basics';

export const RE_TOKEN_DELIMS = /[;\n]+/;
export const TOKEN_DELIMITER = ";"
export const NO_LIMIT = 'U';
export const FLOAT_FRACTION_DIGITS = 3;

export const cfg_parameters_states = [
  states_struct('CFG_PARAMETERS_STATE_COUNT',		0),
  states_struct('CFG_PARAMETERS_STATE_VALUES',	0),
];

export const cfg_parameter_value_struct = struct(
  'name',
  'current_value',
  'text',
  'type',
  'allowed_values'
);

export var cfg_parameter_value = [];
export var	cfg_parameter_count = 0;

export function set_cfg_parameter_count(num) { cfg_parameter_count = num }

export  function check_parameter(parameter) {
  var i = cfg_parameter_value.findIndex(element => "parameter_input_" + element.name == parameter.id);
  var name = cfg_parameter_value[i].name;
  var input_id = parameter.id;
  var input_id = 'parameter_input_' + name;
  var value_old = cfg_parameter_value[i].current_value;

  switch (cfg_parameter_value[i].type) {
    case "L":
      // list: correct by design
      break;
    case "I":
      // int: auto correct values if limits exceeded
      var value = parseInt($("#" + input_id).val());
      if (isNaN(value)) {
        value = 0;
        $("#" + input_id).val(value);
      }
      var min = cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)[0];
      var max = cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)[1];
      if (min != NO_LIMIT && value < parseInt(min))
        $("#" + input_id).val(parseInt(min));
      if (max != NO_LIMIT && value > parseInt(max))
        $("#" + input_id).val(parseInt(max));
      break;
    case "F":
      // float: auto correct values if limits exceeded
      var value = parseFloat($("#" + input_id).val());
      if (isNaN(value)) value = 0;
      var min = cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)[0];
      var max = cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)[1];
      if (min != NO_LIMIT && value < parseFloat(min))
        $("#" + input_id).val(parseFloat(min));
      if (max != NO_LIMIT && value > parseFloat(max))
        $("#" + input_id).val(parseFloat(max));
      // show float values in exponential number format
      $("#" + input_id).val(parseFloat($("#" + input_id).val()).toExponential(FLOAT_FRACTION_DIGITS));
      break;
    default:
      console.log("ERROR: Unknown type " + cfg_parameter_value[i].type + " for cfg parameter " + name);
  }

  // request update of cfg parameter value only if parameter value changed
  var value = $("#" + input_id).val();
  if (value_old != value) {
    send_cmd(rc_cmds.CMD_RC_CFG_VALUE, name, value);

    // clear name of currently loaded cfg file if a parameter value has changed
    cfg_file_current = '';
    $("#ctl_cfg_file_load_name").val("");
  }

  // store new parameter value
  cfg_parameter_value[i].current_value = $("#" + input_id).val();
}


export function update_parameters(){
  // remove old cfg parameter labels and inputs
  $("#grid_parameters_container *").remove();

  // generate full set of cfg parameter labels and inputs
  for (var i in cfg_parameter_value) {
    var name = cfg_parameter_value[i].name;
    var value = cfg_parameter_value[i].current_value;
    var div_id = 'parameter_' + name;
    var input_id = 'parameter_input_' + name;
    var label_text = cfg_parameter_value[i].text + ": ";
    $("#grid_parameters_container").append("<div id='" + div_id + "'></div>");
    $("#" + div_id).append("<label for='" + input_id + "'>" + label_text + "</label>");
    switch (cfg_parameter_value[i].type) {
      case "I":
        // int
        $("#" + div_id).append("<input type='number' name='" + input_id + "' id='" + input_id + "' onchange=check_parameter(this)>");
        $("#" + input_id).attr('min', parseFloat(cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)[0]));
        $("#" + input_id).attr('max', parseFloat(cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)[1]));
        $("#" + input_id).val(Math.floor(value));
        break;
      case "L":
        // list
        $("#" + div_id).append("<select id='" + input_id + "' onchange=check_parameter(this)></select>");
        for (var k in cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)) {
          $("#" + input_id).append("<option>" + cfg_parameter_value[i].allowed_values.split(RE_TOKEN_DELIMS)[k] + "</option>");
        }
        $("#" + input_id).val(value);
        break;
      case "F":
        // float
        $("#" + div_id).append("<input type='text' name='" + input_id + "' id='" + input_id + "' onchange=check_parameter(this)>");
        $("#" + input_id).val(parseFloat(value).toExponential(FLOAT_FRACTION_DIGITS));
        break;
      default:
        console.log("ERROR: Unknown type " + cfg_parameter_value[i].type + " for cfg parameter " + name);
    }
    switch (rc_state) {
      case rc_states.RC_STATE_QUIT:
      case rc_states.RC_STATE_UNDEFINED:
      case rc_states.RC_STATE_GO:
        $("#" + input_id).attr("disabled", "disabled");
        break;
      case rc_states.RC_STATE_HALT:
        $("#" + input_id).removeAttr("disabled");
        if ($('#ctl_trigger_source').val() != "Internal") {
          $('#parameter_input_timer_period_ms').attr('disabled', 'disabled');
        }
        break;
      default:
        console.log("ERROR: Unknown state: " + rc_state);
        break;
    }
  }
}


export function init_parameters() {
  cfg_parameter_count = 0;
  cfg_parameter_value = [];

  status_clearall(cfg_parameters_states);
}





