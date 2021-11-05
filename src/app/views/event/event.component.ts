import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/containers/services/event/event.service';
declare var $: any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
})
export class EventComponent implements OnInit {
  events: any = [];

  event: any = {};

  type: any = '';
  messageError: any = '';

  dataSearch: any = {
    code: '',
    name_event: '',
    page: 0,
    pageSize: 0,
  };

  eventDetault: any = {
    name_Event: '',
    description: '',
    code: '',
    percent: 0,
    daystart: '',
    dayend: '',
    max: 0,
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService
      .get()
      .then((res: any) => {
        if (res) {
          this.events = res;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  }

  openModalUpdate = (eventDetail: any) => {
    if (eventDetail) {
      this.event = Object.assign({}, eventDetail);
      this.type = 'UPDATE';
    } else {
      this.event = Object.assign({}, this.eventDetault);
      this.type = 'CREATE';
    }
    $('#updateEventModal').modal('show');
  };

  updateStartDate = (event: any) => {
    this.event.daystart = event.target.value;
  };

  updateEndDate = (event: any) => {
    this.event.dayend = event.target.value;
  };

  create = (productCreate: any) => {
    this.eventService
      .create(productCreate)
      .then((res: any) => {
        if (res) {
          this.events.push(res);
          $('#updateEventModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  update = (caUpdate: any) => {
    this.eventService
      .update(caUpdate)
      .then((res: any) => {
        if (res) {
          this.events.forEach((element: any, index: number) => {
            if (element.id === res.id) {
              this.events[index] = res;
            }
          });
          $('#updateEventModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  validationFormData = () => {
    let isDataCorrect = true;
    if (!this.event || !this.event) {
      isDataCorrect = false;
    }
    return isDataCorrect;
  };

  save = () => {
    if (this.validationFormData()) {
      if (this.type === 'CREATE') {
        this.create(this.event);
      } else {
        this.update(this.event);
      }
    } else {
      this.messageError = 'Loại sản phẩm không được để trống !';
    }
  };

  search = () => {
    this.eventService
      .search(this.dataSearch)
      .then((res: any) => {
        if (res) {
          this.events = res.data;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  close = () => {
    this.event = Object.assign({}, this.eventDetault);
    $('#updateEventModal').modal('hide');
  };

  resetFormAddPro = () => {
    this.event = Object.assign({}, this.eventDetault);
  };

  remove = (eventId: number) => {
    this.eventService
      .remove(eventId)
      .then((res: any) => {
        if (res) {
          this.events = this.events.filter((x: any) => x.id !== res.id);
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };
}
