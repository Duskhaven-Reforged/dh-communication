import { ClientCallbackOperations } from "../shared/Messages";

const enum FieldType {
    NUMBER = "NUM",
    BOOL = "BOOL"
}

class DeserializeField {
    Object: string = ''
    Delimiter: string = ''
    Name: string = ''
    Type: string = ''
    Dict: string = ''

    Fields: DeserializeField[] | DeserializeField
}
