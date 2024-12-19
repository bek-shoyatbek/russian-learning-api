import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import assert from 'node:assert';
import * as xlsx from 'xlsx';
import { CategoryWithSections, Word } from './types';

@Injectable()
export class ExcelSeederService {
    private prisma = new PrismaClient();
    private readonly sheets = ['categories', 'words'];

    async seedData(filePath: string) {

        await this.prisma.$executeRaw`TRUNCATE TABLE "categories", "sections", "words" CASCADE;`;

        const excelData = this.readExcelData(filePath);

        const categoriesAndSections = excelData[0];

        const wordsWithCategoryAndSection = excelData[1];

        const categories = this.transformExcelDataToCategories(categoriesAndSections);

        await this.prisma.category.createMany({ data: categories });

        const sections = this.transformExcelDataToSections(categoriesAndSections);

        for (let section of sections) {
            const sectionCategory = await this.prisma.category.findFirst({ where: { title: section.categoryTitle } });
            if (!sectionCategory) {
                throw new BadRequestException(`Category ${section.categoryTitle} not found in the database`);
            }
            delete section.categoryTitle;
            await this.prisma.section.create({ data: { ...section, categoryId: sectionCategory.id } });
        }

        const words = this.transformExcelDataToWords(wordsWithCategoryAndSection);

        for (let word of words) {
            const section = await this.prisma.section.findFirst({ where: { title: word.sectionTitle } });
            if (!section) {
                throw new BadRequestException(`Section ${word.sectionTitle} not found in the database`);
            }
            delete word.sectionTitle;
            await this.prisma.word.create({ data: { ...word, sectionId: section.id } });
        }


        console.log('Data seeded successfully!');
    }

    private readExcelData(filePath: string) {
        const result: any[] = [];
        const workbook = xlsx.readFile(filePath);

        assert.deepStrictEqual(workbook.SheetNames, this.sheets);
        const sheets = workbook.SheetNames;

        for (let sheet of sheets) {
            if (!workbook.Sheets[sheet]) {
                throw new BadRequestException(`Sheet ${sheet} not found in the Excel file`);
            }

            const sheetData = workbook.Sheets[sheet];
            const data = xlsx.utils.sheet_to_json<CategoryWithSections | Word>(sheetData, { header: 0 });

            result.push(data);
        }

        return result;
    }

    private transformExcelDataToCategories(data: CategoryWithSections[]) {
        return data.map(d => {
            return {
                title: d.categoryName,
                star: d.categoryStar
            }
        })
    }

    private transformExcelDataToSections(data: CategoryWithSections[]) {
        const sections = [];
        for (let dataItem of data) {
            const section1 = {
                title: dataItem.sectionName1,
                image: dataItem.sectionImage1,
                star: 0,
                categoryTitle: dataItem.categoryName
            };
            const section2 = {
                title: dataItem.sectionName2,
                image: dataItem.sectionImage2,
                star: 0,
                categoryTitle: dataItem.categoryName
            }
            const section3 = {
                title: dataItem.sectionName3,
                image: dataItem.sectionImage3,
                star: 0,
                categoryTitle: dataItem.categoryName
            }
            const section4 = {
                title: dataItem.sectionName4,
                image: dataItem.sectionImage4,
                star: 0,
                categoryTitle: dataItem.categoryName
            }

            sections.push(section1, section2, section3, section4);
        }
        return sections
    }

    private transformExcelDataToWords(data: Word[]) {
        return data.map(d => {
            return {
                wordRu: d.wordRu,
                wordUz: d.wordUz,
                wordRuTrans: d.wordRuTrans,
                exampleRu: d.exampleRu,
                exampleUz: d.exampleUz,
                sectionTitle: d.sectionName
            };
        })
    }
}