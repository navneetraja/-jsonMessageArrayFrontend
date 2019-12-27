export class Message {
  "id": number;
  "code": number;
  "measurementId": number;
  "value": number;
  "visitId": number;
  "recordedTs": string;
}

export class MessageArray {
  updatedVitals: Array<Message>;
}
