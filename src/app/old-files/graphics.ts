///////////////////////////////////////
// graphics
///////////////////////////////////////


// graphics state

// @ts-nocheck
// import { states_struct, status_clearall, status_iscomplete } from './basics.js';
// import { cfg_parameters_states, init_parameters } from './config_params.js';
// import { controls_states, display_mode, display_mode_list, display_node_index_list, init_controls } from './controls.js';
// import { request_initial_config } from './commands.js';
// import { arraybuffer2type_header, TYPE_HEADER_SIZE_BYTES } from './headers.js';

// declare var $: any;
// import * as $ from 'jqueryui';



// import $ from "jquery";
// import * as $ from "jquery";


//
// export const graphics_states = [ //gg
//   states_struct('GRAPHICS_STATE_NODES_NAMES',		0),
//   states_struct('GRAPHICS_STATE_NODES_OMODES',	0),
//   states_struct('GRAPHICS_STATE_SCALES',			0)
// ];
//
// export let nodes_names; export function set_nodes_names(n) { nodes_names = n }
// export let nodes_omodes; export function set_nodes_omodes(n) { nodes_omodes = n }

// export let nodes_headers;
//
// // default values
// // scales
// export let SCALE_FONT = "sans-serif";
// export let SCALE_FONTSIZE = 10;
// export let SCALE_FILLSTYLE = "black";
// export let SCALE_TICKLENGTH = 10;
// export let SCALE_TICK2TEXT_DISTANCE = 0.2 * SCALE_FONTSIZE;
// export let SCALE_DECIMAL_PLACES = 1;
// export let SCALE_DIVS_BETWEEN_LONG_TICKS = 5;
// // resolution
// export let RESOLUTION_DECIMAL_PLACES = 3;
//
// // colorbar
// export let COLORBAR_SLIDER_DEFAULT_VALUES = [
//   255 * 0.40,
//   255 * 0.50,
//   255 * 0.60,
//   255 * 0.70,
//   255 * 0.80
// ];
//
// export let COLORBAR_SCALE_MIN = 0;
// export let COLORBAR_SCALE_MAX = 140;
// export let COLORBAR_SCALE_DECIMAL_PLACES = 0;
//
// // CFAR colors
// // color for areas without target
// export let CFAR_NO_TARGET_COLOR = 0xFFFF0000;
// // highlight color for CFAR targets in combined display mode
// export let CFAR_HIGHLIGHT_COLOR = 0xFF0000FF;
// // transparency for pixels not on a CFAR target in combined display mode
// export let CFAR_TRANSPARENT_COLOR = 0x00000000;
//
//
// // incoming data type/size/start/range
// // export let data_datatype;       export function set_data_datatype(k) { data_datatype = k }
// // export let data_bitwidth;       export function set_data_bitwidth(k) { data_bitwidth = k }
// // export let data_image_size_x;   export function set_data_image_size_x(k) { data_image_size_x = k }
// // export let data_image_size_y;   export function set_data_image_size_y(k) { data_image_size_y = k }
// // export let data_image_start_x;  export function set_data_image_start_x(k) { data_image_start_x = k }
// // export let data_image_start_y;  export function set_data_image_start_y(k) { data_image_start_y = k }
// // export let data_image_range_x;  export function set_data_image_range_x(k) { data_image_range_x = k }
// // export let data_image_range_y;  export function set_data_image_range_y(k) { data_image_range_y = k }
//
// // image position / size
// export let image_data_offset_x;
// export let image_data_size_x;
// export let image_data_offset_y;
// export let image_data_size_y;
//
// // // scales
// // export let scale_legend_x;      export function set_scale_legend_x(k) { scale_legend_x = k }
// // export let scale_legend_y;      export function set_scale_legend_y(k) { scale_legend_x = k }
// // export let scale_world_start_x; export function set_scale_world_start_x(k) { scale_world_start_x = k }
// // export let scale_world_start_y; export function set_scale_world_start_y(k) { scale_world_start_y = k }
// // export let scale_world_range_x; export function set_scale_world_range_x(k) { scale_world_range_x = k }
// // export let scale_world_range_y; export function set_scale_world_range_y(k) { scale_world_range_y = k }
//
// // // resolution / bin
// // export let res_x; export function set_res_x(k) { res_x = k }
// // export let res_y; export function set_res_y(k) { res_y = k }
//
// // canvas data
// export let image_scale_canvas;
// export let image_scale_canvas_ctx;
//
// export let colorbar_scale_canvas;
// export let colorbar_scale_canvas_ctx;
//
// export let image_rdmap_canvas;
// export let image_rdmap_canvas_ctx;
// export let imgdata_rdmap_canvas;
// export let imgdata_rdmap_canvas_ctx;
// export let imgdata_rdmap;
//
// export let image_cfar_canvas;
// export let image_cfar_canvas_ctx;
// export let imgdata_cfar_canvas;
// export let imgdata_cfar_canvas_ctx;
// export let imgdata_cfar;
//
// export let image_cfar_highlight_canvas;
// export let image_cfar_highlight_canvas_ctx;
// export let imgdata_cfar_highlight_canvas;
// export let imgdata_cfar_highlight_canvas_ctx;
// export let imgdata_cfar_highlight;
//
// let scaled_rgbatable;
//
//
//
// // return the width of a text in number of pixels
// export function getWidthOfText(txt, fontname, fontsize) {
//   // Create a dummy canvas (render invisible with css)
//   let c = document.createElement('canvas');
//   // Get the context of the dummy canvas
//   let ctx = c.getContext('2d');
//   // Set the context.font to the font that you are using
//   ctx.font = fontsize + 'px' + fontname;
//   // Measure the string
//   let length = ctx.measureText(txt).width;
//   return length;
// }
//
//
// export function set_data_invalid_marker() {
//   // $('#grid_graphics_container').css('border-color', 'red');
//   document.getElementById('grid_graphics_container').style.borderColor = 'red';
// }
//
//
// export function clear_data_invalid_marker() {
//   // $('#grid_graphics_container').css('border-color', '');
//   document.getElementById('grid_graphics_container').style.borderColor = '';
// }
//
//
// // draw a scale
// // scale_pos_x/y: Start position / pixels of scale line inside canvas
// // scale_size: Length / pixels of scale
// // ticklength: Length of long tick line
// // decimal_places: Number of decimal places to be displayed
// // orientation: Scale orientation ('horizontal', 'vertical_left', 'vertical_right')
// // divs_between_long_ticks: Number of small tick lines -1 between long tick lines
// // fillstyle: fillstyle for lines and text
// // font: font name
// // fontsize: font size in pixels
// // world_start/stop: scale values ranges
// // bins: number of pixels of the corresponding image's dimension
// // legend: legend text
// export function draw_scale(id_canvas, scale_pos_x, scale_pos_y, scale_size, ticklength, decimal_places, orientation, divs_between_long_ticks, fillstyle, font, fontsize, world_start, world_stop, bins, legend) {
//   let element: any = document.getElementById(id_canvas);
//   if (element.getContext) {
//     let ctx = element.getContext('2d');
//
//     ctx.fillStyle = fillstyle;
//     ctx.font = fontsize + "px " + font;
//     ctx.strokeStyle = fillstyle;
//
//     let size_per_bin = scale_size / bins;
//     let image2world_ratio = size_per_bin * (bins - 1) / (world_stop - world_start);
//     let max_scale_value_scale_size = Math.max(getWidthOfText(world_start.toFixed(SCALE_DECIMAL_PLACES).toString(), SCALE_FONT, SCALE_FONTSIZE), getWidthOfText(world_stop.toFixed(SCALE_DECIMAL_PLACES).toString(), SCALE_FONT, SCALE_FONTSIZE));
//
//     let scale_start_x;
//     let scale_start_y;
//     let tick_scale_pos_x_long;
//     let tick_scale_pos_x_short;
//     let tick_scale_pos_y_long;
//     let tick_scale_pos_y_short;
//     let text_scale_pos_x;
//     let text_scale_pos_y;
//     let axis_line_end_x;
//     let axis_line_end_y;
//     let legend_x;
//     let legend_y;
//     let max_divs;
//
//     // calculate default values
//     switch (orientation) {
//       case "horizontal":
//         scale_start_x = scale_pos_x + size_per_bin / 2;
//         scale_start_y = scale_pos_y;
//         tick_scale_pos_x_long = 0;
//         tick_scale_pos_x_short = 0;
//         tick_scale_pos_y_long = ticklength;
//         tick_scale_pos_y_short = ticklength / 2;
//         text_scale_pos_x = 0;
//         text_scale_pos_y = tick_scale_pos_y_long + SCALE_TICK2TEXT_DISTANCE ;
//         axis_line_end_x = scale_pos_x + scale_size;
//         axis_line_end_y = scale_pos_y;
//         legend_x = scale_pos_x + scale_size / 2;
//         legend_y = scale_pos_y + tick_scale_pos_y_long + 2*SCALE_FONTSIZE;
//         ctx.textAlign = "center";
//         ctx.textBaseline = "top";
//         max_divs = Math.floor(size_per_bin * (bins - 1) / max_scale_value_scale_size);
//         break;
//       case "vertical_right":
//         scale_start_x = scale_pos_x;
//         scale_start_y = scale_pos_y - size_per_bin / 2;
//         tick_scale_pos_x_long = ticklength;
//         tick_scale_pos_x_short = ticklength / 2;
//         tick_scale_pos_y_long = 0;
//         tick_scale_pos_y_short = 0;
//         text_scale_pos_x = tick_scale_pos_x_long + SCALE_TICK2TEXT_DISTANCE;
//         text_scale_pos_y = 0;
//         axis_line_end_x = scale_pos_x;
//         axis_line_end_y = scale_pos_y + scale_size;
//         legend_x = scale_pos_x + tick_scale_pos_x_long + max_scale_value_scale_size;
//         legend_y = scale_pos_y + scale_size / 2;
//         ctx.textAlign = "left";
//         ctx.textBaseline = "middle";
//         max_divs = size_per_bin * (bins - 1) / fontsize;
//         break;
//       case "vertical_left":
//         scale_start_x = scale_pos_x;
//         scale_start_y = scale_pos_y - size_per_bin / 2;
//         tick_scale_pos_x_long = -ticklength;
//         tick_scale_pos_x_short = -ticklength / 2;
//         tick_scale_pos_y_long = 0;
//         tick_scale_pos_y_short = 0;
//         text_scale_pos_x = tick_scale_pos_x_long - SCALE_TICK2TEXT_DISTANCE;
//         text_scale_pos_y = 0;
//         axis_line_end_x = scale_pos_x;
//         axis_line_end_y = scale_pos_y + scale_size;
//         legend_x = scale_pos_x + text_scale_pos_x - max_scale_value_scale_size - SCALE_FONTSIZE;
//         legend_y = scale_pos_y + scale_size / 2;
//         ctx.textAlign = "right";
//         ctx.textBaseline = "middle";
//         max_divs = size_per_bin * (bins - 1) / fontsize;
//         break;
//     }
//
//     // calculate step size per division for long/short ticklines, snapped to next power of 10
//     let stepsize_per_div = (world_stop - world_start) / max_divs;
//     let stepsize_per_div_log = Math.ceil(Math.log10(stepsize_per_div));
//     let stepsize_per_div_snap_long = Math.pow(10, stepsize_per_div_log);
//     let stepsize_per_div_snap_short = stepsize_per_div_snap_long / divs_between_long_ticks;
//
//     // step along axis, draw tick lines and values
//     let current_value = Math.ceil(world_start / stepsize_per_div_snap_short) * stepsize_per_div_snap_short;
//     while (current_value <= world_stop) {
//       // calculate world_start position for tick line
//
//       let pos_x;
//       let pos_y;
//
//       switch (orientation) {
//         case "horizontal":
//           pos_x = Math.round(scale_start_x + (current_value - world_start) * image2world_ratio);
//           pos_y = scale_start_y;
//           break;
//         case "vertical_right":
//           pos_x = scale_start_x;
//           pos_y = Math.round(scale_start_y + scale_size - (current_value - world_start) * image2world_ratio);
//           break;
//         case "vertical_left":
//           pos_x = scale_start_x;
//           pos_y = Math.round(scale_start_y + scale_size - (current_value - world_start) * image2world_ratio);
//           break;
//       }
//
//       // draw tick lines + value text
//       if (pos_x >= scale_pos_x && pos_y >= scale_pos_y) {
//         // long tick line at current position?
//         ctx.beginPath();
//         ctx.moveTo(pos_x, pos_y);
//         let tmp_long = current_value / stepsize_per_div_snap_long;
//         if (Math.abs((tmp_long) - Math.round(tmp_long)) < 0.01) {
//           // yes: long tickline + value
//           ctx.lineTo(pos_x + tick_scale_pos_x_long, pos_y + tick_scale_pos_y_long);
//           ctx.fillText(current_value.toFixed(decimal_places), pos_x + text_scale_pos_x, pos_y + text_scale_pos_y);
//         } else {
//           // no: short tickline
//           ctx.lineTo(pos_x + tick_scale_pos_x_short, pos_y + tick_scale_pos_y_short);
//         }
//         ctx.stroke();
//       }
//
//       // increment current value
//       current_value = Math.round((current_value + stepsize_per_div_snap_short) / stepsize_per_div_snap_short) * stepsize_per_div_snap_short;
//     }
//
//     // draw axis
//     ctx.beginPath();
//     ctx.moveTo(scale_pos_x, scale_pos_y);
//     ctx.lineTo(axis_line_end_x, axis_line_end_y);
//     ctx.stroke();
//
//
//     // draw legend
//     if (orientation == "vertical_right" || orientation == "vertical_left") {
//       ctx.save();
//       ctx.translate(0, 0);
//       ctx.rotate(-Math.PI/2);
//       ctx.textAlign = "center";
//       ctx.fillText(legend, -legend_y, legend_x);
//       ctx.restore();
//     } else {
//       ctx.fillText(legend, legend_x, legend_y);
//     }
//   }
// }
//
//
// // draw rdmap scales
// export function draw_scales_rdmap() {
//   // clear image scale canvas
//   image_scale_canvas_ctx.clearRect(0,0,image_scale_canvas.width, image_scale_canvas.height);
//   // x axis
//   draw_scale("image_scale_canvas", image_data_offset_x, image_data_offset_y + image_data_size_y, image_data_size_x, SCALE_TICKLENGTH, SCALE_DECIMAL_PLACES, "horizontal", SCALE_DIVS_BETWEEN_LONG_TICKS, SCALE_FILLSTYLE, SCALE_FONT, SCALE_FONTSIZE, scale_world_start_x * 100, (scale_world_start_x + scale_world_range_x) * 100, data_image_range_x, scale_legend_x + ' / cm  (' + (res_x * 100).toFixed(RESOLUTION_DECIMAL_PLACES) + ' cm / bin)');
//   // y axis
//   draw_scale("image_scale_canvas", image_data_offset_x, image_data_offset_y, image_data_size_y, SCALE_TICKLENGTH, SCALE_DECIMAL_PLACES, "vertical_left", SCALE_DIVS_BETWEEN_LONG_TICKS, SCALE_FILLSTYLE, SCALE_FONT, SCALE_FONTSIZE, scale_world_start_y, scale_world_start_y + scale_world_range_y, data_image_range_y, scale_legend_y + ' / m/s  (' + res_y.toFixed(RESOLUTION_DECIMAL_PLACES) + ' m/s / bin)');
//   // clear colorbar scale canvas
//   colorbar_scale_canvas_ctx.clearRect(0,0,colorbar_scale_canvas.width, colorbar_scale_canvas.height);
//   // colorbar
//   draw_scale("colorbar_scale_canvas", 0, image_data_offset_y, image_data_size_y, SCALE_TICKLENGTH, COLORBAR_SCALE_DECIMAL_PLACES, "vertical_right", SCALE_DIVS_BETWEEN_LONG_TICKS, SCALE_FILLSTYLE, SCALE_FONT, SCALE_FONTSIZE, COLORBAR_SCALE_MIN, COLORBAR_SCALE_MAX, 100000, "");
// }
//
//
// // adjust colorbar according to current window dimensions
// export function adjust_colorbar() {
//   let id_elements = ["#colorbar_blue", "#colorbar_cyan2blue", "#colorbar_green2cyan", "#colorbar_yellow2green", "#colorbar_red2yellow", "#colorbar_red"];
//   let id_slider = "#colorbar_slider"
//
//   // read values from slider, sort values and write them back to slider
//   let values = $(id_slider).slider("option", "values").sort(function(a,b) { return a - b });
//   $(id_slider).slider({"values": values});
//
//   // adjust heights of colorbar ranges according to slider values
//   for (let i = 0; i <= values.length; i++) {
//     if (i == 0) {
//       $(id_elements[i]).css("height", String(values[i] * 100/255)+"%");
//     } else if (i == values.length) {
//       $(id_elements[i]).css("height", String((255 - values[i-1]) * 100/255)+"%");
//     } else {
//       $(id_elements[i]).css("height", String((values[i] - values[i-1]) * 100/255)+"%");
//     }
//   }
//
//   // RGBA table, maps uint8 values to RGBA values
//   // RGBA values are stored as ABGR
//   let cb_blue_level = parseInt(values[0]);
//   let cb_cyan_level = parseInt(values[1]);
//   let cb_green_level = parseInt(values[2]);
//   let cb_yellow_level = parseInt(values[3]);
//   let cb_red_level = parseInt(values[4]);
//
//
//   let rgbatable = new Uint32Array(256);
//   for (let i = 0;i <= cb_blue_level;i++) {
//     rgbatable[i] = 0xFFFF0000;
//   }
//   for (let i = cb_blue_level;i <= cb_cyan_level;i++) {
//     rgbatable[i] = 0xFFFF0000 + ((255*(i-cb_blue_level)/(cb_cyan_level-cb_blue_level)) << 8);
//   }
//   for (let i = cb_cyan_level;i <= cb_green_level;i++) {
//     rgbatable[i] = 0xFFFFFF00 - ((255*(i-cb_cyan_level)/(cb_green_level-cb_cyan_level)) << 16);
//   }
//   for (let i = cb_green_level;i <= cb_yellow_level;i++) {
//     rgbatable[i] = 0xFF00FF00 + (255*(i-cb_green_level)/(cb_yellow_level-cb_green_level));
//   }
//   for (let i = cb_yellow_level;i <= cb_red_level;i++) {
//     rgbatable[i] = 0xFF00FFFF - ((255*(i-cb_yellow_level)/(cb_red_level-cb_yellow_level)) << 8);
//   }
//   for (let i = cb_red_level;i <= 255;i++) {
//     rgbatable[i] = 0xFF0000FF;
//   }
//
//   // scaled RGBA table, maps Uint8 radar data to colormap
//   scaled_rgbatable = new Uint32Array(256);
//
//   let scale = 255/(COLORBAR_SCALE_MAX - COLORBAR_SCALE_MIN);
//   let offset = -COLORBAR_SCALE_MIN;
//
//   // // mapping for signed input data
//   // for (i = 0;i < 256;i++) {
//   // 	if (i >= 128) {
//   // 		data_signed = i - 256;
//   // 	} else {
//   // 		data_signed = i;
//   // 	}
//   // 	if (data_signed < COLORBAR_SCALE_MIN) {
//   // 		scaled_rgbatable[i] = 0xFF800000;
//   // 	} else if (data_signed > COLORBAR_SCALE_MAX) {
//   // 		scaled_rgbatable[i] = 0xFF000080;
//   // 	} else {
//   // 		scaled_rgbatable[i] = rgbatable[(scale * (data_signed + offset)) | 0];
//   // 	}
//   // }
//
//   // mapping for unsigned input data
//   for (let i = 0;i < 256;i++) {
//     if (i < COLORBAR_SCALE_MIN) {
//       scaled_rgbatable[i] = 0xFF800000;
//     } else if (i > COLORBAR_SCALE_MAX) {
//       scaled_rgbatable[i] = 0xFF000080;
//     } else {
//       scaled_rgbatable[i] = rgbatable[(scale * (i + offset)) | 0];
//     }
//   }
//
// }
//
//
// // adjust graphics according to current window dimensions
// export function adjust_graphics () {
//
//   /////////////////////////////////////////////////
//   // adjust widths
//
//   // auto adjust first
//   $("#grid_graphics_image").css("width", "auto");
//   $("#image_scale_canvas").css("width", "auto");
//   $("#image_scale_canvas").attr("width", "auto");
//   $("#grid_graphics_colorbar_scale").css("width", "auto");
//   $("#colorbar_scale_canvas").css("width", "auto");
//   $("#colorbar_scale_canvas").attr("width", "auto");
//
//   // read current widths inside graphics box
//   let graphics_width = parseInt($("#grid_graphics").css("width"));
//   let spacer_width = parseInt($("#grid_graphics_spacer").css("width"));
//   let colorbar_slider_width = parseInt($("#grid_graphics_colorbar_slider").css("width"));
//   let colorbar_width = parseInt($("#grid_graphics_colorbar").css("width"));
//
//   // colorbar scale
//   let colorbar_scale_width = Math.max(getWidthOfText(COLORBAR_SCALE_MIN.toFixed(COLORBAR_SCALE_DECIMAL_PLACES).toString(), SCALE_FONT, SCALE_FONTSIZE), getWidthOfText(COLORBAR_SCALE_MAX.toFixed(COLORBAR_SCALE_DECIMAL_PLACES).toString(), SCALE_FONT, SCALE_FONTSIZE)) + SCALE_TICKLENGTH + SCALE_TICK2TEXT_DISTANCE;
//   $("#grid_graphics_colorbar_scale").css("width", colorbar_scale_width + "px");
//   $("#colorbar_scale_canvas").css("width", colorbar_scale_width + "px");
//   $("#colorbar_scale_canvas").attr("width", colorbar_scale_width);
//
//   // image
//   let max_scale_y_value_size = Math.round(Math.max(getWidthOfText(scale_world_start_y.toFixed(SCALE_DECIMAL_PLACES).toString(), SCALE_FONT, SCALE_FONTSIZE), getWidthOfText((scale_world_start_y + scale_world_range_y).toFixed(SCALE_DECIMAL_PLACES).toString(), SCALE_FONT, SCALE_FONTSIZE)));
//   let image_scale_width = graphics_width - (spacer_width + colorbar_slider_width + colorbar_width + colorbar_scale_width);
//   image_data_offset_x = SCALE_TICKLENGTH + max_scale_y_value_size + SCALE_TICK2TEXT_DISTANCE + 2 * SCALE_FONTSIZE;
//   image_data_size_x = image_scale_width - image_data_offset_x - SCALE_FONTSIZE;
//   $("#grid_graphics_image").css("width", image_scale_width + "px");
//   $("#image_scale_canvas").css("width", image_scale_width + "px");
//   $("#image_scale_canvas").attr("width", image_scale_width);
//   $("#image_rdmap_canvas").css("width", image_data_size_x + "px");
//   $("#image_cfar_canvas").css("width", image_data_size_x + "px");
//   $("#image_cfar_highlight_canvas").css("width", image_data_size_x + "px");
//
//   /////////////////////////////////////////////////
//   // adjust heights
//
//   // read current height of frames
//   let graphics_height = parseInt($("#grid_graphics_container.box").css("height"), 10);
//
//   image_data_offset_y = SCALE_FONTSIZE/2;
//   image_data_size_y = graphics_height - (image_data_offset_y + SCALE_TICKLENGTH + SCALE_TICK2TEXT_DISTANCE + 3*SCALE_FONTSIZE);
//
//   // colorbar
//   $("#grid_graphics_colorbar_slider").css("height", image_data_size_y);
//   $("#grid_graphics_colorbar").css("height", image_data_size_y);
//   $("#colorbar_scale_canvas").css("height", graphics_height + "px");
//   $("#colorbar_scale_canvas").attr("height", graphics_height);
//
//   // image
//   $("#image_scale_canvas").css("height", graphics_height + "px");
//   $("#image_scale_canvas").attr("height", graphics_height);
//   $("#image_rdmap_canvas").css("height", image_data_size_y + "px");
//   $("#image_cfar_canvas").css("height", image_data_size_y + "px");
//   $("#image_cfar_highlight_canvas").css("height", image_data_size_y + "px");
//
//   /////////////////////////////////////////////////
//   // adjust offsets
//
//   // colorbar
//   $("#grid_graphics_colorbar_slider").css("padding-top", image_data_offset_y);
//   $("#grid_graphics_colorbar").css("padding-top", image_data_offset_y);
//
//   // image
//   $("#image_rdmap_canvas").css("top", image_data_offset_y - 1 + "px");
//   $("#image_rdmap_canvas").css("left", image_data_offset_x - 1 + "px");
//   $("#image_cfar_canvas").css("top", image_data_offset_y - 1 + "px");
//   $("#image_cfar_canvas").css("left", image_data_offset_x - 1 + "px");
//   $("#image_cfar_highlight_canvas").css("top", image_data_offset_y - 1 + "px");
//   $("#image_cfar_highlight_canvas").css("left", image_data_offset_x - 1 + "px");
//
//   /////////////////////////////////////////////////
//   // adjust colorbar colors
//
//   adjust_colorbar();
//
// }
//
//
// export function process_graphics_data(data_buffer) {
//   // cfg_parameters / controls / graphics must be fully configured before
//   if ((!status_iscomplete(cfg_parameters_states)) ||
//     (!status_iscomplete(controls_states)) ||
//     (!status_iscomplete(graphics_states))) {
//     // reset cfg_parameters/controls/graphics, request initial config
//     console.log("WARNING: Pipeline header received, but basic configuration is not complete");
//     init_parameters();
//     init_controls();
//     init_graphics();
//     request_initial_config();
//     return;
//   }
//
//   // do nothing if node index of data received is not included in the list of node indices to be displayed
//   let node_index = arraybuffer2type_header(data_buffer.slice(0, TYPE_HEADER_SIZE_BYTES)).value;
//   if (!display_node_index_list.includes(node_index)) return;
//
//   // check incoming datatype
//   if (data_datatype != 'U') {
//     alert("ERROR: Wrong datatype (" + data_datatype + ") received");
//     return;
//   }
//
//
//   let data;
//   let rgba_buf32;
//   let rgba_buf8;
//
//   // map received data to RGBA values
//   // use the highest byte only
//   switch (nodes_headers[node_index].bitwidth) {
//     case 8:
//       data = new Uint8Array(data_buffer.slice(TYPE_HEADER_SIZE_BYTES));
//       rgba_buf32 = Uint32Array.from(data).map(e => scaled_rgbatable[e]);
//       break;
//     case 16:
//       data = new Uint16Array(data_buffer.slice(TYPE_HEADER_SIZE_BYTES));
//       rgba_buf32 = Uint32Array.from(data).map(e => scaled_rgbatable[e >> 8]);
//       break;
//     case 32:
//       data = new Uint32Array(data_buffer.slice(TYPE_HEADER_SIZE_BYTES));
//       rgba_buf32 = data.map(e => scaled_rgbatable[e >> 24]);
//       break;
//     default:
//       alert("ERROR: Wrong bitwidth (" + nodes_headers[node_index].data_bitwidth + ") received");
//       return;
//   }
//
//   rgba_buf8 = new Uint8Array(rgba_buf32.buffer);
//
//   // copy RGBA data to canvas
//   let display_mode_received = display_mode_list[display_node_index_list.findIndex(e => e == node_index)];
//   switch (display_mode_received) {
//     case 'R/D Map':
//       imgdata_rdmap.data.set(rgba_buf8);
//       image_rdmap_canvas_ctx.putImageData(imgdata_rdmap, 0, 0, data_image_start_x, data_image_start_y, data_image_range_x, data_image_range_y);
//       break;
//     case 'CFAR':
//       imgdata_cfar.data.set(rgba_buf8);
//       image_cfar_canvas_ctx.putImageData(imgdata_cfar, 0, 0, data_image_start_x, data_image_start_y, data_image_range_x, data_image_range_y);
//       rgba_buf8 = new Uint8Array(rgba_buf32.map(x => x != CFAR_NO_TARGET_COLOR ? CFAR_HIGHLIGHT_COLOR : CFAR_TRANSPARENT_COLOR).buffer);
//       imgdata_cfar_highlight.data.set(rgba_buf8);
//       image_cfar_highlight_canvas_ctx.putImageData(imgdata_cfar_highlight, 0, 0, data_image_start_x, data_image_start_y, data_image_range_x, data_image_range_y);
//       break;
//     default:
//       console.log("ERROR: Unknown display mode (" + display_mode + ")");
//       break;
//   }
//
//   clear_data_invalid_marker();
// }
//
//
// // redraw canvas overlays
// export function update_canvas_overlays() {
//   if(status_iscomplete(graphics_states)) {
//     switch (display_mode) {
//       case 'R/D Map':
//         $("#image_rdmap_canvas").css("z-index", "3");
//         $("#image_cfar_canvas").css("z-index", "2");
//         $("#image_cfar_highlight_canvas").css("z-index", "2");
//         break;
//       case 'CFAR':
//         $("#image_cfar_canvas").css("z-index", "3");
//         $("#image_rdmap_canvas").css("z-index", "2");
//         $("#image_cfar_highlight_canvas").css("z-index", "2");
//         break;
//       case 'Combined':
//         $("#image_cfar_highlight_canvas").css("z-index", "3");
//         $("#image_rdmap_canvas").css("z-index", "2");
//         $("#image_cfar_canvas").css("z-index", "1");
//         break;
//       default:
//         break;
//     }
//   }
// }
//
//
// // redraw graphics according to current window dimemsions and scale settings
// export function update_graphics() {
//   if(status_iscomplete(graphics_states)) {
//     draw_scales_rdmap();
//
//     image_rdmap_canvas.width = data_image_range_x;
//     image_rdmap_canvas.height = data_image_range_y;
//     imgdata_rdmap = image_rdmap_canvas_ctx.getImageData(0, 0, data_image_size_x, data_image_size_y);
//     $("#image_rdmap_canvas").css("border", "solid 1px black");
//
//     image_cfar_canvas.width = data_image_size_x;
//     image_cfar_canvas.height = data_image_size_y;
//     imgdata_cfar = image_cfar_canvas_ctx.getImageData(0, 0, data_image_size_x, data_image_size_y);
//     $("#image_cfar_canvas").css("border", "solid 1px black");
//
//     image_cfar_highlight_canvas.width = data_image_size_x;
//     image_cfar_highlight_canvas.height = data_image_size_y;
//     imgdata_cfar_highlight = image_cfar_highlight_canvas_ctx.getImageData(0, 0, data_image_size_x, data_image_size_y);
//     $("#image_cfar_highlight_canvas").css("border", "solid 1px black");
//
//     update_canvas_overlays();
//   }
// }
//
//
// // initialize graphics settings
// export function init_graphics() {
//   status_clearall(graphics_states);
//
//   nodes_names = [];
//   nodes_omodes = [];
//   nodes_headers = [];
//
//   scale_legend_x = '';
//   scale_legend_y = '';
//   data_datatype = '';
//   data_bitwidth = 0;
//   data_image_size_x = 0;
//   data_image_size_y = 0;
//   data_image_start_x = 0;
//   data_image_start_y = 0;
//   data_image_range_x = 0;
//   data_image_range_y = 0;
//   scale_world_start_x = 0;
//   scale_world_start_y = 0;
//   scale_world_range_x = 0;
//   scale_world_range_y = 0;
//   res_x = 0;
//   res_y = 0;
//
//   $("#colorbar_slider").slider({
//     orientation: "vertical",
//     values: COLORBAR_SLIDER_DEFAULT_VALUES,
//     min: 0,
//     max: 255,
//     slide: function() {
//       adjust_colorbar();
//     }
//   });
//
//   image_scale_canvas = document.getElementById('image_scale_canvas');
//   image_scale_canvas_ctx = image_scale_canvas.getContext("2d");
//
//   colorbar_scale_canvas = document.getElementById('colorbar_scale_canvas');
//   colorbar_scale_canvas_ctx = colorbar_scale_canvas.getContext("2d");
//
//   image_rdmap_canvas = document.getElementById('image_rdmap_canvas');
//   image_rdmap_canvas_ctx = image_rdmap_canvas.getContext('2d');
//   imgdata_rdmap_canvas = document.createElement('canvas');
//
//   image_cfar_canvas = document.getElementById('image_cfar_canvas');
//   image_cfar_canvas_ctx = image_cfar_canvas.getContext('2d');
//   imgdata_cfar_canvas = document.createElement('canvas');
//
//   image_cfar_highlight_canvas = document.getElementById('image_cfar_highlight_canvas');
//   image_cfar_highlight_canvas_ctx = image_cfar_highlight_canvas.getContext('2d');
//   imgdata_cfar_highlight_canvas = document.createElement('canvas');
// }




