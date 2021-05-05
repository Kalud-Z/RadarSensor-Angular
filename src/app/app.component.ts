import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class AppComponent implements AfterViewInit{
  ws:any;


  ngAfterViewInit(): void {
    // this.main();
  }

//   main() {
// // initialize settings
//     this.init_window();
//     this.update_window();
//
//     // open websockets connection
//     // ws = new_ws(get_appropriate_ws_url(""), "rc");
//     this.ws = new_ws('ws://192.168.1.101:4000/', "rc");
//
//     this.ws.binaryType = 'arraybuffer';
//
//     try {
//       this.ws.onopen = function() {
//         ws_state = ws_states.WS_STATE_CONNECTED;
//         console.log("ws open");
//         request_initial_config();
//       };
//
//       this.ws.onmessage = function got_packet(msg) {
//         // console.log('we just received data from websocket | msg.data : ', msg.data); //this is ALWAYS an ArrayBuffer
//         var type_header = arraybuffer2type_header(msg.data.slice(0, TYPE_HEADER_SIZE_BYTES));
//         switch (type_header.tag) {
//           case HEADER_TAG_PIPELINE:
//             console.log('we just got HEADER_TAG_PIPELINE');
//             process_pipeline_headers(msg.data);
//             break;
//           case HEADER_TAG_DATA:
//             console.log('we just got HEADER_TAG_DATA');
//             process_graphics_data(msg.data);
//             break;
//           case HEADER_TAG_COMMAND:
//             console.log('we just got HEADER_TAG_COMMAND');
//             process_cmd(msg.data);
//             break;
//           case HEADER_TAG_NODE:
//           default:
//             console.log("ws receive: ERROR | Unexpected header received: " + type_header.tag);
//             break;
//         }
//       };
//
//       this.ws.onclose = function(){
//         ws_state = ws_states.WS_STATE_DISCONNECTED;
//         console.log("ws close");
//       };
//
//     } catch(exception) { alert("<p>Error " + exception) }
//
//     // register event handlers
//     // window resize
//     $(window).bind('resize', function() {
//       if ($("input").is(":focus")) {
//         // save id of input field focused during resize and restore focus after update
//         // to keep virtual keyboard active on mobile devices
//         var id = $(":focus").attr("id");
//         update_window();
//         $("#" + id).focus();
//       } else {
//         update_window();
//       }
//     });
//     // Runs/RUN/STOP/QUIT
//     $('#ctl_nruns').change(nruns_handler);
//     $('#ctl_run').click(run_stop_handler);
//     $('#ctl_quit').click(quit_handler);
//     // Display mode
//     $('#ctl_display_mode').change(display_mode_handler);
//     // trigger source
//     $('#ctl_trigger_source').change(trigger_handler);
//     $('#ctl_trigger_id').change(trigger_handler);
//     // cfg file load/save
//     $('#ctl_cfg_file_load_name').change(cfg_file_load_handler);
//     $('#ctl_cfg_file_save').click(cfg_file_save_handler);
//
//   }
//
//
//
//
//   init_window() {
//     init_graphics();
//     init_controls();
//     init_parameters();
//   }
//
//
//   update_window() {
//     adjust_graphics();
//     update_graphics();
//     update_controls();
//     update_parameters();
//   }



}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
