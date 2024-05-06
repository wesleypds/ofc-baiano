package com.oficinadobaiano.model.dto;

import lombok.Data;

@Data
public class Corpo<T> {
    private T success;
    private T errorMsg;
    private T options;
    private T data;
}
