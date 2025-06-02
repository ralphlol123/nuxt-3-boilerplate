export interface ValidationRule {
    (value: any): boolean | string;
}