package com.vulnscan.modal;

import lombok.Data;

import java.time.Instant;

@Data
public class ScanResponse {
    private String tool;
    private String target;
    private String status;
    private String timestamp;
    private String result;

    public ScanResponse(String tool, String target, String status, String result) {
        this.tool = tool;
        this.target = target;
        this.status = status;
        this.timestamp = Instant.now().toString(); // ISO 8601 format
        this.result = result;
    }
}
