import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { Paginator } from 'primeng/paginator';
import { formatDate } from '@angular/common';
import { metaData } from 'src/app/common/models/interfaces';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @ViewChild('page') page: Paginator;
  @Input() responseData: any = {};
  @Input() config: any = {};
  @Input() loader: boolean;
  @Output() actionHappens = new EventEmitter();
  columns: object[] = [];
  records: object[] = [];
  hasRecords = false;
  showPagination = false;
  meta: any = {
    pageNumber: 0,
    pageSize: 10,
    pageCount: 1,
    recordCount: 0,
  };
  error = '';
  loading: boolean;
  prevMeta: any = {
    pageNumber: 0,
    pageSize: 10,
    pageCount: 1,
    recordCount: 0,
  };
  constructor(private localService: LocalServiceService) {}

  ngOnInit(): void {
    this.localService.errorLoader.subscribe((res) => {
      this.loading = res;
    });
    this.columns = this.config.columns;
    this.records = this.responseData?.records;
    this.hasRecords = !_.isEmpty(this.records);
    this.showPagination = this.responseData?.metaData?.recordCount > 10;
    this.loading = this.loader;
  }
  pageChange() {
    this.page?.changePage(this.meta?.pageNumber);
  }
  onError(error: string): void {
    this.error = error;
  }
  actionData(row: any, action: any): any {
    if (!action.func) {
      return action;
    }
    return action.func(row, action);
  }

  actionClick(type: string, data: any, rowData: any = {}): void {
    this.actionHappens.emit({ type, data, rowData });
  }
  dataFormatting(value: any, options: any): any {
    if (!value) {
      return '-';
    }
    if (_.isEmpty(options) || (_.isEmpty(value) && !_.isNumber(value))) {
      return value;
    }
    switch (options.type) {
      case 'date':
        return formatDate(value, options.format || 'dd/MM/yyyy', 'en-US');
      case 'number':
        return _.round(value, options.decimalPlaces).toFixed(
          options.decimalPlaces
        );
      case 'roleObject':
        return value.role;
      case 'warehouseName':
        return value.name;
      default:
        return value;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.records = this.responseData?.records;
    this.hasRecords = !_.isEmpty(this.records);
    this.showPagination = this.responseData?.metaData?.recordCount > 10;
    this.meta = this.responseData?.metaData || this.meta;
    this.loading = this.loader;
  }
}
