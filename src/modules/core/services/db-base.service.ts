import { DBConnection, DBQueryCallback, DBQueryResult, ObjectType } from '@app-types/index';
import { BaseService } from '@modules/core/';

const Operators = {
    '=': '=',
    '!=': '!=',
    '>=': '>=',
    '<=': '<=',
    '>': '>',
    '<': '<',
};

export default abstract class DBBaseService extends BaseService {

    private __db: DBConnection;

    protected _makeInsertStatement(tableName: string, fieldsValues: ObjectType) {
        let fields = '';
        let values = '';
        for (const field in fieldsValues) {
            if (fields) {
                fields += ', ';
            }
            fields += field;
            const value = fieldsValues[field];

            if (values) {
                values += ', ';
            }
            if (typeof value == 'string') {
                values += `'${value}'`;
            } else {
                values += value;
            }
        }
        const query = `INSERT INTO ${tableName}(${fields}) values(${values})`;
        return query;
    }

    protected _makeUpdateSetStatement(data: ObjectType) {
        let stmt = '';
        for (const field in data) {
            const value = data[field];
            if (stmt) {
                stmt += ', ';
            }
            stmt += field + ' =';
            if (typeof value == 'string') {
                stmt += `'${value}'`;
            } else {
                stmt += value;
            }
        }
        return stmt;
    }

    protected _makeWhere(fieldsData: ObjectType) {
        const fieldsArr = [];
        for (const field in fieldsData) {
            const value = fieldsData[field];
            let opr, val;
            if (Array.isArray(value) && value.length == 2) {
                const [ op, _val ] = value;
                if (Operators[op]) {
                    opr = op;
                    val = _val;
                }
            }  
            if (!opr) {
                opr = '=';
                val = value;
            }
            const stmt = ` ${field} ${opr} ${val} `;
            fieldsArr.push(stmt);
        }
        return fieldsArr;
    }

    protected _makeSelectStmtFields(fieldsData: ObjectType): string {
        let stmt = '';
        for (const colName in fieldsData) {
            const alias = fieldsData[colName];
            let select = `\`${colName}\``;
            if (colName !=  alias) {
                select += ` AS \`${alias}\``;
            }
            if (stmt) {
                stmt += ',';
            }
            stmt += select;
        }
        return stmt;
    }


    protected _makeSimpleUpdateStmt(tableName: string, values: ObjectType, whereFields?: ObjectType, whereConditon = 'AND') {
        let setStmt = ' * ';
        let where = ' 1 ';
        if (whereFields) {
            where = this._makeWhere(whereFields).join(` ${whereConditon} `);
        }
        if (values) {
            setStmt = this._makeUpdateSetStatement(values);
        }
        const query = `UPDATE ${tableName} SET ${setStmt} WHERE ${where}`;
        return query;
    }


    protected _makeSimpleSelectStmt(tableName: string, whereFields?: ObjectType, selectFields?: ObjectType, whereConditon = 'AND') {
        let select = ' * ';
        let where = ' 1 ';
        if (whereFields) {
            where = this._makeWhere(whereFields).join(` ${whereConditon} `);
        }
        if (selectFields) {
            select = this._makeSelectStmtFields(selectFields);
        }
        const query = `SELECT ${select} from ${tableName} WHERE ${where}`;
        return query;
    }

    protected _makeSimpleDeleteStmt(tableName: string, whereFields?: ObjectType, whereConditon = 'AND') {
        let where = ' 1 ';
        if (whereFields) {
            where = this._makeWhere(whereFields).join(` ${whereConditon} `);
        }
        const query = `DELETE from ${tableName} WHERE ${where}`;
        return query;
    }


    public simpleSelect<T>(tableName: string, whereFields?: ObjectType, selectFields?: ObjectType, whereConditon = 'AND'): Promise<T[]> {
        const query = this._makeSimpleSelectStmt(tableName, whereFields, selectFields, whereConditon);
        return this.runQueryPromise<T[]>(query);
    }

    public simpleDelete(tableName: string, whereFields?: ObjectType, whereConditon = 'AND'): Promise<DBQueryResult> {
        const query = this._makeSimpleDeleteStmt(tableName, whereFields, whereConditon);
        return this.runQueryPromise<DBQueryResult>(query);
    }

    public simpleUpdate(tableName: string, values: ObjectType, whereFields?: ObjectType, whereConditon = 'AND'): Promise<DBQueryResult> {
        const query = this._makeSimpleUpdateStmt(tableName, values, whereFields, whereConditon);
        return this.runQueryPromise<DBQueryResult>(query);
    }


    public simpleInsert(tableName: string, values: ObjectType): Promise<DBQueryResult> {
        const query = this._makeInsertStatement(tableName, values);
        return this.runQueryPromise<DBQueryResult>(query);
    }

    public runQueryPromise<T>(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.runQuery(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public runQuery(query: string, callback: DBQueryCallback) {
        this._db.query(query, callback);
    }

    protected get _db(): DBConnection {
        if (!this.__db) {
            this.__db = (globalThis.SERVER.getDBConnection() as DBConnection);
        }
        return this.__db;
    }

}