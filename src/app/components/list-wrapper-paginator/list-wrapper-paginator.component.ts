import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  Inject,
  OnChanges,
  SimpleChange
} from "@angular/core";
import { EXPANSION_PANEL_ANIMATION_TIMING } from "@angular/material/expansion";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AbstractEntityService } from "app/@core/data/abstract-service";
import { BasicEntity } from "app/models/base/basicentity.model";
import { Subscription } from "rxjs";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  PageEvent
} from "@angular/material";
import { ConfirmacaoModalComponent } from "app/components/confirmacao-modal/confirmacao-modal.component";
import { trigger, state, style } from "@angular/animations";
import { transition } from "@angular/animations";
import { animate } from "@angular/animations";
import { HttpErrorResponse } from "@angular/common/http";
import { ServersDataSource } from "./server.datasource";

@Injectable()
export class MatPaginatorPtbrProvider extends MatPaginatorIntl {
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  itemsPerPageLabel = "Itens por página:";
  nextPageLabel = "Próxima";
  previousPageLabel = "Anterior";
}

@Component({
  selector: "list-wrapper-paginator",
  templateUrl: "./list-wrapper-paginator.component.html",
  styleUrls: ["./list-wrapper-paginator.component.scss"],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorPtbrProvider }
  ],

  animations: [
    trigger("expand", [
      state(
        "true",
        style({
          "transform-origin": "top",
          height: "*",
          transform: "scaleY(1)"
        })
      ),
      state(
        "false",
        style({
          "transform-origin": "top",
          height: "0px",
          transform: "scaleY(0)"
        })
      ),
      transition("true <=> false", animate(EXPANSION_PANEL_ANIMATION_TIMING))
    ])
  ]
})
export class ListWrapperPaginatorComponent
  implements OnInit, AfterViewInit, OnChanges {
  page = 0;
  dataSource: ServersDataSource | null;
  data: any;

  // Pagination
  length: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  filtro: string = '';
  filtroAtivo: boolean = false;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  async onPageChanged(e) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    if(this.filtroAtivo){
      this.filterPagination();
    } else {
      this.loadData();
    }
  }

  @Input() entidadeService: AbstractEntityService<any>;

  @Input()
  colunas: {
    columnDef: string;
    header: string;
    cell: (row) => string;
    sortable: boolean;
  }[] = [];

  @Input()
  desativarEditar(elemento: BasicEntity) {
    return false;
  }

  @Input()
  desativarExcluir(elemento: BasicEntity) {
    return false;
  }

  @Input()
  filterFunc(element, index, array): boolean {
    return true;
  }

  @Input() add: boolean = true;

  @Input() loading: boolean = true;

  @Output()
  editButtonClicked: EventEmitter<BasicEntity | null> = new EventEmitter<BasicEntity | null>();

  @Output() addButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  deleteButtonClicked: EventEmitter<BasicEntity | null> = new EventEmitter<BasicEntity | null>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  displayedCols = this.colunas.map(x => x.columnDef);

  onEditButtonClick(entity: BasicEntity) {
    this.editButtonClicked.emit(entity);
  }

  onAddButtonClick() {
    this.addButtonClicked.emit();
  }

  ngOnInit() {
    this.displayedCols = this.colunas.map(x => x.columnDef).concat("editar");

    this.loadData();
  }

  ngAfterViewInit() {
    this.paginator.pageSizeOptions = this.pageSizeOptions;
  }

  ngOnChanges() {
    if (!this.loading) {
      this.loadData();
    }
  }

  loadData() {
    this.data = this.entidadeService.getData(this.page, this.pageSize);
    this.data.subscribe(data => {
      this.setPagination(data["totalElements"], data["number"]);
      this.dataSource = new ServersDataSource(data["content"]);
    });
  }

  verifyPagination(filtro: string){
    this.filtro = filtro;
    if (filtro) {
      this.filtroAtivo = true;
      this.filterPagination();
    } else {
      this.filtroAtivo = false;
      this.page = 0;
      this.loadData();
    }
  }

  filterPagination() {
      this.data = this.entidadeService.getDataFilter(
        this.page,
        this.pageSize,
        this.filtro,
      );
      this.data.subscribe(data => {
        this.setPagination(data["totalElements"], data["number"]);
        this.dataSource = new ServersDataSource(data["content"]);
      });
  }

  setPagination(length, pageIndex) {
    this.length = length;
    this.pageIndex = pageIndex;
  }
}
