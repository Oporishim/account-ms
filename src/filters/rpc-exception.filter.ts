import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class MicroserviceRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException): Observable<any> {
    const msResponse = exception.getError();
    return throwError(() => msResponse);
  }
}
