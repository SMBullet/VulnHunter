package com.vulnscan.modal;

import lombok.Data;

@Data
public class ScanRequest {
    private String ipOrDomain;
    private String tool;
}
