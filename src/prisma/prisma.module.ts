import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // whith @Global our PrismaService (that we exported inside @Module) will be available to all the modules in our app
// Also PrismaModule needs to be imported in app.module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
