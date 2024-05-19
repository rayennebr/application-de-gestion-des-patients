package com.gestionpatient.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GenericSingleResponse<T> {
    private int status;
    private String message;
    private T data;

}
