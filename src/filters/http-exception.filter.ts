import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class MicroserviceHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any): Observable<any> {
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      message = exception.getResponse();
    } else if (
      typeof exception === 'object' &&
      exception !== null &&
      'message' in exception
    ) {
      message = (exception as { message: string | object }).message;
    }

    return throwError(() => message);
  }
}
